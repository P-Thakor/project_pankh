const nodemailer = require('nodemailer');
const pug = require('pug');
// const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.username;
    this.url = url;
    this.from = `Kandarp Vyas <kandarp7777@gmail.com>`;
  }

  newTransport() {
    // console.log('Sending Email');
    // return nodemailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   auth: {
    //     user: process.env.EMAIL_USERNAME,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    return nodemailer.createTransport({
      host: process.env.MAILJET_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILJET_EMAIL,
        pass: process.env.MAILJET_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject, data = {}) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      ...data,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      // text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the PANKH!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      `Your password reset token (valid for only 10 minutes)}`,
    );
  }

  async sendVerificationEmail() {
    await this.send('verifyEmail', `Verify your email address`);
  }

  async sendEventReminder(event) {
    await this.send('eventReminder', `Reminder: ${event.name} is today!`);
  }

  async sendNewEventAlert(event) {
    await this.send('newEventAlert', `New Event Alert: ${event.name}`);
  }

  async sendRegistrationConfirmation(event) {
    await this.send(
      'registrationConfirmation',
      `Registration Confirmation: ${event.name}`,
      { event },
    );
  }
};

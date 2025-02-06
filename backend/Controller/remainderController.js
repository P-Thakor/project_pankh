const EventModel = require('../Models/eventModel');
const moment = require('moment'); // For date handling
const sendEmail = require('../Utils/email');

const sendReminderEmails = async () => {
  try {
    const today = moment().format('YYYY-MM-DD'); // Format date as YYYY-MM-DD
    const eventsToday = await EventModel.find({ startDate: today }).populate(
      'participants',
    );

    if (eventsToday.length === 0) {
      console.log('No events scheduled for today.');
      return;
    }

    await Promise.all(
      eventsToday.map(async (event) => {
        await Promise.all(
          event.participants.map(async (participant) => {
            await sendEmail(participant.email, event).sendEventReminder();
          }),
        );
      }),
    );
    console.log('Reminder emails sent successfully.');
  } catch (error) {
    console.error('Error sending reminder emails:', error);
  }
};

exports.sendReminderEmails = sendReminderEmails;

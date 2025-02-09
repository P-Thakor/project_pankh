// const sharp = require('sharp');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const Event = require('../Models/eventModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const User = require('../Models/userModel');
const sendEmail = require('../Utils/email');
const PDFDocument = require('pdfkit');
const { Table } = require('pdfkit-table');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dosqfitt3', // Your Cloudinary cloud name
  api_key: '248321553526181', // Your Cloudinary API key
  api_secret: 'J25-nWU8vBFI3bZQDyIX4AIER1o', // Your Cloudinary API secret
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadEventImages = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'photo' },
  { name: 'profilePhoto', maxCount: 1 },
]);

exports.uploadImage = catchAsync(async (req, res, next) => {
  try {
    // Helper function to upload image to Cloudinary
    const uploadImageToCloudinary = function (file, filename) {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            public_id: `your_folder/${filename}`,
            resource_type: 'image',
            overwrite: true,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary Upload Error:', error);
              reject(new AppError('Error uploading image to Cloudinary', 500));
            } else {
              resolve(result.secure_url);
            }
          },
        );

        if (file && file.buffer) {
          stream.end(file.buffer);
        } else {
          reject(new AppError('File buffer missing or incorrect', 400));
        }
      });
    };
    console.log(req.files);
    if (req.files?.profilePhoto) {
      const profilePhoto = await uploadImageToCloudinary(
        req.files.profilePhoto[0],
        `profilePhoto_${Date.now()}`,
      );
      req.body.profilePhoto = profilePhoto;
    }

    // Upload coverImage if it exists
    if (req.files?.coverImage) {
      const coverImageUrl = await uploadImageToCloudinary(
        req.files.coverImage[0],
        `coverImage_${Date.now()}`,
      );
      if (req.url === '/updateEvent/:id') {
        const updatedEvent = await Event.findByIdAndUpdate(
          req.params.id,
          { coverImage: coverImageUrl },
          { new: true },
        );
        console.log('Updated Event with Cover Image:', updatedEvent);
      }
      if (req.url === '/createEvent') {
        req.body.coverImage = coverImageUrl;
      }
    }

    // Upload photos if they exist
    if (req.files?.photo) {
      const photoUrls = await Promise.all(
        req.files.photo.map((file, index) =>
          uploadImageToCloudinary(file, `Event_photo_${index}_${Date.now()}`),
        ),
      );

      // Await the database update to ensure it completes
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        {
          $push: { photo: { $each: photoUrls } },
        },
        { new: true },
      );
      console.log('Updated Event with Photos:', updatedEvent);
    }

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error in uploadImage:', error);
    next(new AppError('Error uploading images', 500));
  }
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
  console.log(req.url);
  const events = await Event.find()
    .populate({
      path: 'reviews',
      populate: { path: 'author' },
    })
    .populate({
      path: 'participants', // Populating the participants
      select: 'username collegeId email', // Only select the 'email' field from participants
    })
    .populate({
      path: 'attendance',
      select: 'username collegeId email',
    })
    .sort({ startTime: 1 });

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: events,
  });
});

exports.getOneEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id)
    .populate({
      path: 'reviews',
      populate: { path: 'author' },
    })
    .populate({
      path: 'participants', // Populating the participants
      select: 'username collegeId email', // Only select the 'email' field from participants
    })
    .populate({
      path: 'attendance',
      select: 'username collegeId email',
    });
  if (!event) {
    return next(new AppError(404, 'Event not found'));
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
});

exports.generateEventRepot = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('participants', 'username collegeId email')
      .populate('attendance', 'username collegeId email')
      .populate('creator', 'username')
      .select('name description startDate endDate creator');

    const attendance = event.attendance.map((user) => ({
      username: user.username,
      collegeId: user.collegeId,
      email: user.email,
    }));

    const participants = event.participants.map((user) => ({
      username: user.username,
      collegeId: user.collegeId,
      email: user.email,
    }));

    const absentees = participants.filter(
      (user) => !attendance.some((attendee) => attendee.email === user.email),
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // **Set Response Headers for PDF Download**
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="event_report.pdf"`,
    );

    // **Create PDF and Pipe it to Response**
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // **Header**
    doc
      .fontSize(20)
      .fillColor('#1F618D')
      .font('Helvetica-Bold') // ✅ Make the title bold
      .text('Event Report', { align: 'center', underline: true });
    doc.moveDown(1);

    // **Event Details**
    doc
      .font('Helvetica-Bold')
      .fontSize(14)
      .fillColor('#000')
      .text(`Event Name:`, { continued: true });
    doc.font('Helvetica').text(` ${event.name}`); // Normal font for value
    doc.moveDown(0.5);

    doc.font('Helvetica-Bold').text(`Description:`, { continued: true });
    doc.font('Helvetica').text(` ${event.description}`);
    doc.moveDown(0.5);

    doc.font('Helvetica-Bold').text(`Start Date:`, { continued: true });
    doc
      .font('Helvetica')
      .text(` ${new Date(event.startDate).toLocaleString()}`);
    doc.moveDown(0.5);

    doc.font('Helvetica-Bold').text(`End Date:`, { continued: true });
    doc.font('Helvetica').text(` ${new Date(event.endDate).toLocaleString()}`);
    doc.moveDown(0.5);

    doc.font('Helvetica-Bold').text(`Organizer:`, { continued: true });
    doc.font('Helvetica').text(` ${event.creator.username}`);
    doc.moveDown(1);

    // **Participants Title (Ensure Left Alignment & Bold)**
    if (event.attendance.length > 0) {
      doc.moveDown(1); // Ensure spacing before title
      doc
        .fontSize(16)
        .fillColor('#1F618D')
        .font('Helvetica-Bold') // ✅ Make the title bold
        .text('Attendance:', { align: 'left', underline: true });
      doc.moveDown(0.5); // Add spacing before table
      addTable(doc, ['No.', 'Name', 'College ID', 'Email'], event.participants);
    }

    // **Force "Attendance" Title to Align with "Participants" & Bold**
    if (absentees.length > 0) {
      doc.moveDown(1); // Ensure same spacing as "Participants"
      doc.text('', 50); // Move cursor to start of line
      doc
        .fontSize(16)
        .fillColor('#1F618D')
        .font('Helvetica-Bold') // ✅ Make the title bold
        .text('Absentees:', { align: 'left', underline: true });
      doc.moveDown(0.5);
      addTable(doc, ['No.', 'Name', 'College ID', 'Email'], event.attendance);
    }

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// **Function to Draw Table**
function addTable(doc, headers, data) {
  let startX = 50;
  let startY = doc.y + 10;
  const columnWidths = [40, 150, 100, 200];

  doc.fontSize(12).fillColor('#000');

  // Draw Headers
  headers.forEach((text, i) => {
    doc.rect(startX, startY, columnWidths[i], 25).stroke();
    doc.text(text, startX + 5, startY + 7);
    startX += columnWidths[i];
  });

  // Draw Rows
  startY += 25;
  data.forEach((item, index) => {
    startX = 50;
    const row = [
      index + 1,
      item.username || 'N/A',
      item.collegeId || 'N/A',
      item.email || 'N/A',
    ];

    row.forEach((cell, i) => {
      let text = cell !== undefined && cell !== null ? cell.toString() : 'N/A';
      doc.rect(startX, startY, columnWidths[i], 20).stroke();
      doc.text(text, startX + 5, startY + 5);
      startX += columnWidths[i];
    });
    startY += 20;
  });

  doc.moveDown(2);
}

exports.createEvent = catchAsync(async (req, res, next) => {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const newEvent = await Event.create({
      ...req.body,
      creator: req.user.id,
      contactEmail: req.user.email,
      contactNumber: req.user.contactNumber,
    });

    const otherEmail = req.body.otherEmail;
    console.log(otherEmail);
    if (otherEmail) {
      await Promise.all(
        otherEmail.map(async (email) => {
          const emailData = new sendEmail(email, 'eventCreated');
          await emailData.sendNewEventAlert(newEvent);
        }),
      );
      // otherEmail.forEach((email) => {
      //   const emailData = new sendEmail(email, 'eventCreated');
      //   emailData.sendNewEventAlert(newEvent);
      // });
    }
    // const users = await User.find(); // Fetch all users or specific users

    // await Promise.all(
    //   users.map((user) => {
    //     const email = new sendEmail(user.email, 'eventCreated'); // Instantiate the class with `new`
    //     return email.sendNewEventAlert(newEvent); // Call the method on the instance
    //   }),
    // );
    res.status(201).json({
      status: 'success',
      data: newEvent,
    });
  } catch (error) {
    console.error('Error in createEvent:', error);
    next(new AppError('Error creating event', 500));
  }
});

exports.createEventByClub = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create(req.body);
  newEvent.clubOrganiser = req.params.id;
  res.status(201).json({
    status: 'success',
    data: newEvent,
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);

  // if (req.file) req.body.coverImage = req.file.filename;

  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    return next(new AppError(404, 'Event not found'));
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
  });
});

exports.attendance = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Event ID
  const { userIds } = req.body; // Expecting an array of user IDs

  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ message: 'User IDs array is required' });
  }

  // Find the event by ID
  let event = await Event.findById(id);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  // Push each user ID into the attendance array
  event.attendance.push(...userIds);

  // Update each user's eventsAttended field
  await Promise.all(
    userIds.map(async (userId) => {
      const user = await User.findById(userId);
      if (user) {
        user.eventsAttended.push(id);
        await user.save();
      }
    })
  );

  // Determine absentees.
  // Convert participant IDs to strings to ensure a proper comparison.
  const absentees = event.participants.filter(
    (participant) => !userIds.includes(participant.toString())
  );
  console.log("Absentees: ", absentees);
  console.log("Participants: ", userIds);

  // Update each absentee's eventsMissed field
  await Promise.all(
    absentees.map(async (userId) => {
      const user = await User.findById(userId);
      if (user) {
        user.eventsMissed.push(id);
        await user.save();
      }
    })
  );

  // Save the updated event
  await event.save();

  res.status(200).json({
    status: 'success',
    message: 'Attendance marked successfully',
    data: event,
  });
});

// exports.resizeEventImage = catchAsync(async (req, res, next) => {
//   console.log(req.files);
//   // console.log(req.body);
//   if (!req.files.coverImage || !req.files.photo) return next();

//   // req.file.filename = `event-${Date.now()}.jpeg`;

//   req.body.coverImage = `event-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.coverImage[0].buffer)
//     .toFormat('jpeg')
//     .jpeg({
//       quality: 90,
//     })
//     .toFile(`./public/img/${req.body.coverImage}`);

//   next();
// });

exports.registerEventForUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError('Event not found', 404));
  }
  if (user.eventsParticipated.includes(req.params.id)) {
    return next(
      new AppError('You have already registered for this event', 400),
    );
  }

  if (!event.participants) {
    event.participants = []; // Initialize if it doesn't exist
  }

  console.log(user);
  const email = new sendEmail(user.email, 'eventRegistered');
  await email.sendRegistrationConfirmation(event);
  user.eventsParticipated.push(req.params.id);
  event.participants.push(user._id);
  await user.save();
  await event.save();

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

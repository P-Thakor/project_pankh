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
const emojiUnicode = require('emoji-unicode');
const axios = require('axios');

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
      path: 'participants',
      select: 'username collegeId email',
    })
    .populate({
      path: 'attendance',
      select: 'username collegeId email',
    });

  if (!event) {
    return next(new AppError(404, 'Event not found'));
  }

  // Manually sort the populated fields
  if (event.participants) {
    event.participants.sort((a, b) => a.collegeId.localeCompare(b.collegeId));
  }

  if (event.attendance) {
    event.attendance.sort((a, b) => a.collegeId.localeCompare(b.collegeId));
  }

  res.status(200).json({
    status: 'success',
    data: event,
  });
});

exports.generateEventRepot = async (req, res, next) => {
  try {
    // Fetch event details
    const event = await Event.findById(req.params.id)
      .populate('participants', 'username collegeId email')
      .populate('attendance', 'username collegeId email')
      .populate('creator', 'username')
      .select(
        'name description startDate endDate creator locations attendance participants coverImage',
      );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Prepare attendance and absentees data
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
      (user) =>
        !attendance.some((attendee) => attendee.collegeId === user.collegeId),
    );

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="event_report.pdf"',
    );

    // Create PDF document
    const doc = new PDFDocument({ margin: 30 });
    doc.pipe(res);

    // Add header logos
    addHeaderLogos(doc);

    // Add event details
    addEventDetails(doc, event);

    // Add cover image if available
    await addCoverImage(doc, event.coverImage);

    // Add attendance table
    if (attendance.length > 0) {
      addTableSection(doc, 'Attendance', attendance);
    }

    // Add absentees table
    if (absentees.length > 0) {
      addTableSection(doc, 'Absentees', absentees);
    }

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to add header logos
function addHeaderLogos(doc) {
  try {
    const pathToLogo1 = path.join(__dirname, '../public/charusat_logo.png');
    const pathToLogo2 = path.join(__dirname, '../public/depstar_logo.png');

    // Add left logo
    if (fs.existsSync(pathToLogo1)) {
      doc.image(pathToLogo1, 30, 20, { fit: [200, 75], align: 'left' });
    }

    // Add right logo
    const pageWidth = doc.page.width;
    const imageWidth = 100;
    const marginRight = 10;
    const x = pageWidth - imageWidth - marginRight;
    if (fs.existsSync(pathToLogo2)) {
      doc.image(pathToLogo2, x, 0, { width: imageWidth, height: 75 });
    }

    doc.moveDown(6);
  } catch (error) {
    console.error('Error adding header logos:', error);
  }
}

// Helper function to add event details
function addEventDetails(doc, event) {
  doc
    .fontSize(20)
    .fillColor('#1F618D')
    .font('Helvetica-Bold')
    .text('Event Report', { align: 'center', underline: true });
  doc.moveDown(1);

  doc.font('Helvetica-Bold').fontSize(14).fillColor('#000');
  doc.text('Event Name:', { continued: true });
  doc.font('Helvetica').text(` ${event.name} `);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').text('Event Venue:', { continued: true });
  doc.font('Helvetica').text(` ${event.locations}`);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').text('Description:', { continued: true });
  doc.font('Helvetica').text(` ${event.description}`);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').text('Start Date:', { continued: true });
  doc.font('Helvetica').text(` ${new Date(event.startDate).toLocaleString()}`);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').text('End Date:', { continued: true });
  doc.font('Helvetica').text(` ${new Date(event.endDate).toLocaleString()}`);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').text('Organizer:', { continued: true });
  doc.font('Helvetica').text(` ${event.creator.username}`);
  doc.moveDown(1);
}

// Helper function to add cover image
async function addCoverImage(doc, coverImageUrl) {
  if (coverImageUrl && coverImageUrl.startsWith('http')) {
    try {
      const response = await axios({
        url: coverImageUrl,
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data, 'binary');

      const imageHeight = 300;
      const availableSpace = doc.page.height - doc.y - doc.page.margins.bottom;

      // Add a new page if the image doesn't fit
      if (availableSpace < imageHeight) {
        doc.addPage();
      }

      doc.image(imageBuffer, {
        fit: [500, 300],
        align: 'center',
        valign: 'top',
      });
      doc.moveDown(1);
    } catch (error) {
      console.error('Error loading cover image:', error);
    }
  }
}

// Helper function to add table sections
function addTableSection(doc, title, data) {
  doc.moveDown(1);
  doc
    .fontSize(16)
    .fillColor('#1F618D')
    .font('Helvetica-Bold')
    .text(`${title}:`, { align: 'left', underline: true });
  doc.moveDown(0.5);

  const headers = ['No.', 'Name', 'College ID', 'Email'];
  addTable(doc, headers, data);
}

// Helper function to add tables
function addTable(doc, headers, data) {
  const startX = 50;
  let currentY = doc.y + 10;
  const columnWidths = [40, 150, 100, 200];
  const pageBottom = doc.page.height - doc.page.margins.bottom;

  doc.fontSize(12).fillColor('#000');

  // Fixed header row height
  const headerHeight = 25;
  if (currentY + headerHeight > pageBottom) {
    doc.addPage();
    currentY = doc.page.margins.top;
  }

  // Draw Header Row
  let x = startX;
  headers.forEach((text, i) => {
    doc.rect(x, currentY, columnWidths[i], headerHeight).stroke();
    doc.text(text, x + 5, currentY + 7, {
      width: columnWidths[i] - 10,
      align: 'left',
    });
    x += columnWidths[i];
  });
  currentY += headerHeight;

  // Fixed row height for data rows
  const rowHeight = 20;
  data.forEach((item, index) => {
    if (currentY + rowHeight > pageBottom) {
      doc.addPage();
      currentY = doc.page.margins.top;
    }
    x = startX;
    const rowData = [
      index + 1,
      item.username || 'N/A',
      item.collegeId || 'N/A',
      item.email || 'N/A',
    ];
    rowData.forEach((cell, i) => {
      doc.rect(x, currentY, columnWidths[i], rowHeight).stroke();
      doc.text(cell.toString(), x + 5, currentY + 5, {
        width: columnWidths[i] - 10,
        align: 'left',
      });
      x += columnWidths[i];
    });
    currentY += rowHeight;
  });
  doc.y = currentY + 10;
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

    // await new sendEmail(req.user.email, 'eventCreated').sendNewEventAlert(
    //   newEvent,
    // );

    if (
      req.body.department &&
      req.body.department.length > 0 &&
      req.body.year &&
      req.body.year.length > 0
    ) {
      const regexPattern = req.body.department.join('|');
      const currentYear = new Date().getFullYear();

      // Convert year array to corresponding year patterns (last two digits)
      const yearPatterns = req.body.year.map((year) => {
        const yearPattern = currentYear - year;
        return yearPattern.toString().slice(-2);
      });

      // Join multiple year patterns using '|' to match any of them
      const yearRegex = `^(${yearPatterns.join('|')})`;

      const emailData1 = await User.find({
        email: { $regex: `${yearRegex}${regexPattern}`, $options: 'i' },
      }).select('email');

      const emailData2 = await User.find({
        email: { $regex: `(${regexPattern}).*\\.ac\\.in$`, $options: 'i' },
      }).select('email');

      const emailData = emailData1.concat(emailData2);
      console.log('Department Regex:', regexPattern);
      console.log('Year Patterns:', yearPatterns);
      console.log('Email Faculty:', emailData2);
      console.log('Email Students:', emailData1);
      console.log('Matching Emails:', emailData);

      if (emailData.length > 0) {
        await Promise.all(
          emailData.map(async (user) => {
            const emailData = new sendEmail(user.email, 'eventCreated');
            await emailData.sendNewEventAlert(newEvent);
          }),
        );
      }
    } else {
      if (req.body.department && req.body.department.length > 0) {
        // Create a regex pattern to match any department name in the email
        const regexPattern = req.body.department.join('|'); // E.g., "cse|ce|it"

        // Find students whose email contains any of the department names
        const emailData = await User.find({
          email: { $regex: regexPattern, $options: 'i' }, // Case-insensitive match
        }).select('email');

        console.log('Matching Emails:', emailData);

        if (emailData.length > 0) {
          await Promise.all(
            emailData.map(async (user) => {
              const emailData = new sendEmail(user.email, 'eventCreated');
              await emailData.sendNewEventAlert(newEvent);
            }),
          );
        }
      }
      if (req.body.year && req.body.year.length > 0) {
        const currentYear = new Date().getFullYear();
        const yearPatterns = req.body.year.map((year) => {
          return (currentYear - year).toString().slice(-2);
        });

        const yearRegex = `^(${yearPatterns.join('|')})`;

        const yearData = await User.find({
          email: { $regex: yearRegex, $options: 'i' },
        }).select('email');

        console.log('Year Patterns:', yearPatterns);
        console.log('Matching Years:', yearData);

        if (yearData.length > 0) {
          await Promise.all(
            yearData.map(async (user) => {
              const emailData = new sendEmail(user.email, 'eventCreated');
              await emailData.sendNewEventAlert(newEvent);
            }),
          );
        }
      }
    }
    const otherEmail = req.body.otherEmail;
    console.log(otherEmail);
    if (otherEmail) {
      await Promise.all(
        otherEmail.map(async (email) => {
          const emailData = new sendEmail(email, 'eventCreated');
          await emailData.sendNewEventAlert(newEvent);
        }),
      );
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
    if (error.code === 11000) {
      console.error('Error in createEvent:', error);
      return next(new AppError('Event Name already exists', 400));
    }
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
        user.missedEventCounter = 0;
        await user.save();
      }
    }),
  );

  // Determine absentees.
  // Convert participant IDs to strings to ensure a proper comparison.
  const absentees = event.participants.filter(
    (participant) => !userIds.includes(participant.toString()),
  );
  console.log('Absentees: ', absentees);
  console.log('Participants: ', userIds);

  // Update each absentee's eventsMissed field
  await Promise.all(
    absentees.map(async (userId) => {
      const user = await User.findById(userId);
      if (user) {
        user.eventsMissed.push(id);
        user.missedEventCounter += 1;
        if (user.missedEventCounter >= 2) {
          user.active = false;
        }
        await user.save();
      }
    }),
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

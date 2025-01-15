// const sharp = require('sharp');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Event = require('../Models/eventModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const User = require('../Models/userModel');
const sendEmail = require('../Utils/email');

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

    // Upload coverImage if it exists
    if (req.files.coverImage) {
      const coverImageUrl = await uploadImageToCloudinary(
        req.files.coverImage[0],
        `coverImage_${Date.now()}`,
      );
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        { coverImage: coverImageUrl },
        { new: true },
      );
      console.log('Updated Event with Cover Image:', updatedEvent);
    }

    // Upload photos if they exist
    if (req.files.photo) {
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
  // console.log(req.user.role);
  const events = await Event.find()
    .populate({
      path: 'reviews',
      populate: { path: 'author' },
    })
    .populate({
      path: 'participants', // Populating the participants
      select: 'email', // Only select the 'email' field from participants
    });

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
      select: 'email', // Only select the 'email' field from participants
    });
  if (!event) {
    return next(new AppError(404, 'Event not found'));
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
});

exports.createEvent = catchAsync(async (req, res, next) => {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const newEvent = await Event.create({ ...req.body, creator: req.user.id, contactEmail: req.body.email || req.user.email });

    // const users = await User.find(); // Fetch all users or specific users

    // await Promise.all(
    //   users.map((user) => {
    //     const email = new sendEmail(user, 'eventCreated'); // Instantiate the class with `new`
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

  // console.log(user);
  const email = new sendEmail(user, 'eventRegistered');
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

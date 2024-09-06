const Club = require('../Models/clubModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
// const slugify = require('slugify');s

const mockClubs = [
  {
    _id: '1',

    foundedDate: new Date('2020-01-01'),
  },
  {
    _id: '2',
    name: 'Music Club',
    slug: 'music-club',
    description: 'A club for music lovers',
    foundedDate: new Date('2021-06-15'),
  },
];

exports.createClub = catchAsync(async (req, res, next) => {
  const newClub = await Club.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      club: newClub,
    },
  });
  // res.send('yes i worked ');
});

exports.getAllClubs = catchAsync(async (req, res, next) => {
  const clubs = await Club.find();
  res.status(200).json({
    status: 'success',
    results: clubs.length,
    data: {
      clubs,
    },
  });

  res.send('yes i worked ');
});

exports.getClubById = catchAsync(async (req, res, next) => {
  const club = await Club.findById(req.params.id);
  if (!club) {
    return next(new AppError('Club not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      club,
    },
  });

  // res.send('yes i worked ');
});

exports.updateClub = catchAsync(async (req, res, next) => {
  const updatedClub = await Club.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedClub) {
    return next(new AppError('Club not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      club: updatedClub,
    },
  });

  // res.send('yes i worked ');
});

exports.deleteClub = catchAsync(async (req, res, next) => {
  const club = await Club.findByIdAndDelete(req.params.id);
  if (!club) {
    return next(new AppError('Club not found', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });

  // res.send('yes i worked ');
});

// exports.createClub = catchAsync(async (req, res, next) => {
//   const newClub = { _id: String(mockClubs.length + 1), ...req.body };
//   newClub.slug = slugify(newClub.name, { lower: true });
//   mockClubs.push(newClub);
//   res.status(201).json({
//     status: 'success',
//     data: {
//       club: newClub,
//     },
//   });
// });

// exports.getAllClubs = catchAsync(async (req, res, next) => {
//   res.status(200).json({
//     status: 'success',
//     results: mockClubs.length,
//     data: {
//       clubs: mockClubs,
//     },
//   });
// });

// exports.getClubById = catchAsync(async (req, res, next) => {
//   const club = mockClubs.find((c) => c._id === req.params.id);
//   if (!club) {
//     return next(new AppError('Club not found', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       club,
//     },
//   });
// });

// exports.updateClub = catchAsync(async (req, res, next) => {
//   const index = mockClubs.findIndex((c) => c._id === req.params.id);
//   if (index === -1) {
//     return next(new AppError('Club not found', 404));
//   }
//   const updatedClub = { ...mockClubs[index], ...req.body };
//   updatedClub.slug = slugify(updatedClub.name, { lower: true });
//   mockClubs[index] = updatedClub;
//   res.status(200).json({
//     status: 'success',
//     data: {
//       club: updatedClub,
//     },
//   });
// });

// // Delete a club by ID
// exports.deleteClub = catchAsync(async (req, res, next) => {
//   const index = mockClubs.findIndex((c) => c._id === req.params.id);
//   if (index === -1) {
//     return next(new AppError('Club not found', 404));
//   }
//   mockClubs.splice(index, 1);
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

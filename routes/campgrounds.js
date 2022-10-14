const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ dest: 'uploads/' });
const upload2 = multer({ storage });

const Campground = require('../models/campground');

// console.log(upload);
// console.log(upload2);

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(upload2.array('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send("Hello");
    })
    // .post(upload2.single('image'), (req, res) => {
    //     console.log(req.body, req.file);
    //     res.send("Hello");
    // })
    // .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))



module.exports = router;
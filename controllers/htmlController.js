import express from "express";

const router = express.Router();

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/contact', function(req, res) {
    res.render('contact');
});

// router.get('/merch', function(req, res) {
//     res.render('merch');
// });

// router.get('/gallery', function(req, res) {
//     res.render('gallery');
// });

// router.get('/synopsis', function(req, res) {
//     res.render('synopsis');
// });

// router.get('/contactme', function(req, res) {
//     res.render('contactme');
// });

export default router;

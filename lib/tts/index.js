const router = require('express').Router();

router.use('/google', require('./google'));
router.use('/elevenlabs', require('./elevenlabs'));
router.use('/smallest', require('./smallest'));

module.exports = router;

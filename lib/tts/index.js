const router = require('express').Router();

router.use('/google', require('./google'));
router.use('/elevenlabs', require('./elevenlabs'));
router.use('/rime', require('./rime'));

module.exports = router;

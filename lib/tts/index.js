const router = require('express').Router();

router.use('/google', require('./google'));
router.use('/elevenlabs', require('./elevenlabs'));
/* deepgram is a *streaming* TTS example — it streams the WAV response body */
router.use('/deepgram', require('./deepgram'));

module.exports = router;

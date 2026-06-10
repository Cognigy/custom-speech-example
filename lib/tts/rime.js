const routes = require('express').Router();
const assert = require('assert');
const bent = require('bent');
const RIME_URL = 'https://users.rime.ai';

routes.post('/', async(req, res) => {
  const {logger} = req.app.locals;
  const {language, voice, type, text} = req.body;
  try {
    assert.ok(process.env.RIME_API_KEY, 'RIME_API_KEY is not set');
    if (!text || !voice) {
      return res.status(400).json({error: 'missing required parameters: text, voice'});
    }
    if (type === 'ssml') {
      return res.status(400).json({error: 'rime does not support ssml input'});
    }

    /* the voice may select the model ("coda:astra", "arcana:luna", "mistv2:cove");
       a bare speaker name ("astra") uses RIME_MODEL_ID */
    const idx = voice.indexOf(':');
    const modelId = idx > 0 ? voice.slice(0, idx) : (process.env.RIME_MODEL_ID || 'coda');
    const speaker = idx > 0 ? voice.slice(idx + 1) : voice;

    /* Cognigy sends BCP-47 ("en-US"); coda/arcana take ISO 639-1 ("en") but
       mistv2 only accepts ISO 639-3 ("eng", "spa", "spa-mx", "fra", "ger") */
    let lang = (language || 'en').split('-')[0].toLowerCase();
    if (modelId === 'mistv2') {
      lang = /^es-mx$/i.test(language) ? 'spa-mx' :
        ({en: 'eng', es: 'spa', fr: 'fra', de: 'ger'}[lang] || lang);
    }

    const startAt = process.hrtime();
    const post = bent(RIME_URL, 'POST', 'buffer', {
      'Authorization': `Bearer ${process.env.RIME_API_KEY}`,
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json'
    });
    const mp3 = await post('/v1/rime-tts', {
      text,
      speaker,
      modelId,
      /* docs name this "language" (coda) or "lang" (arcana/mistv2); the API
         treats them as aliases and rejects requests containing both */
      lang
    });
    const diff = process.hrtime(startAt);
    const rtt = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(0);

    logger.info({modelId, speaker, lang}, `successfully synthesized speech using rime in ${rtt} ms`);
    res.set('Content-Type', 'audio/mpeg');
    res.send(mp3);
  } catch (err) {
    let detail = err.message;
    if (err.responseBody) {
      try {
        detail = (await err.responseBody).toString();
      } catch (e) { /* fall back to err.message */ }
    }
    logger.error({statusCode: err.statusCode, detail}, 'synthAudio: Error synthesizing speech using rime');
    res.status(err.statusCode || 500).json({error: detail});
  }
});

module.exports = routes;

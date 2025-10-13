# Custom Speech Example

This repository serves as an illustrative guide for integrating support for a
custom speech vendor into [Cognigy Voice Gateway](https://www.cognigy.com/platform/cognigy-voice-gateway)
using the speech API. It showcases the incorporation of the following examples:

**TTS**:

- [google](https://cloud.google.com/text-to-speech/docs),
- [elevenlabs](https://beta.elevenlabs.io/)

**STT**:

- [google](https://cloud.google.com/speech-to-text)
- [gladia](https://docs.gladia.io/reference/live-audio)
- [assemblyAI](https://www.assemblyai.com/docs/walkthroughs#realtime-streaming-transcription)
- [Vosk](https://alphacephei.com/vosk/server).

## Configuration

You can configure the application to connect to all of the providers or just
some depending on the environment variables supplied.

- To use google, supply GCP_JSON_KEY_FILE pointing to your google json key
- To use elevenlabs, supply ELEVEN_API_KEY which has your api key
- To use assemblyAI, supply ASSEMBLY_AI_API_TOKEN which has your assemblyAI api key
- To use gladia, supply GLADIA_API_KEY
- To use Vosk, supply VOSK_URL which has the ip:port of the Vosk server grpc endpoint

## Running

```bash
$ npm ci

$ API_KEY=<apikey> \
GCP_JSON_KEY_FILE=<google-json-key-path> \
ASSEMBLY_AI_API_TOKEN=<assemblyai-api-key> \
VOSK_URL=xxxx:yyyy
GLADIA_API_KEY=xxxxxxxx \
ELEVEN_API_KEY=xxxxxxx \
HTTP_PORT=3000 node app.js
```

Then, in the Cognigy Voice Gateway portal create a custom speech vendor,
providing the wss (for STT) and http(s) (for TTS) URLs to your server,
and your api key (`apikey`).

After adding the custom speech vendors you can use them in a Cognigy Voice Gateway
application. Make sure this application is running and accessible at the URLs
you provisioned into Cognigy Voice Gateway.

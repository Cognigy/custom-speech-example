# Custom Speech Example

This repository serves as an illustrative guide for integrating support for a custom speech vendor into [Cognigy Voice Gateway](https://www.cognigy.com/platform/cognigy-voice-gateway) using the speech API. It showcases the incorporation of the following examples:

- Text-to-Speech (TTS) providers: [Google](https://cloud.google.com/text-to-speech/docs)
- Speech-to-Text (STT) providers: [Google](https://cloud.google.com/speech-to-text), [AssemblyAI](https://www.assemblyai.com/docs/walkthroughs#realtime-streaming-transcription), and [Vosk](https://alphacephei.com/vosk/server).

## Configuration

To configure the application to connect with the desired speech vendors, adjust the corresponding environment variables:

- For Google integration, set `GCP_JSON_KEY_FILE` to the path of your Google JSON key.
- For AssemblyAI integration, set `ASSEMBLY_AI_API_TOKEN` to your AssemblyAI API key.
- For Vosk integration, set `VOSK_URL` to the IP address and port of the Vosk server's gRPC endpoint.

## Running

Follow these steps to run the application:

1. Install the required dependencies:
   ```bash
   $ npm ci
   ```

2. Execute the application using the provided environment variables:
   ```bash
   $ API_KEY=<foobarwhatever> \
     GCP_JSON_KEY_FILE=<google-json-key-path> \
     ASSEMBLY_AI_API_TOKEN=<assemblyai-api-key> \
     VOSK_URL=xxxx:yyyy \
     HTTP_PORT=3000 node app.js
   ```

3. In the Cognigy Voice Gateway portal, create a custom speech vendor, specifying the WebSocket Secure (wss) URL for STT and the HTTP(S) URL for TTS to your server, along with your API key (foobarwhatever).

Once you have added the custom speech vendors, you can utilize them within a Cognigy Voice Gateway application. Ensure that this application is running and accessible at the URLs you provided during the Cognigy Voice Gateway configuration process.

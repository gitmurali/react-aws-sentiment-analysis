import React, { useState } from "react";

import { MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import mic from "microphone-stream";

import { theme } from "../styles/styles";
import { getBuffer } from "../helpers";

/** Start/Stop Audio Recording  */
const AudioRecorder = ({ finishRecording, classes }) => {
  const [recording, setRecording] = useState(false);
  const [micStream, setMicStream] = useState();
  const [audioBuffer] = useState(() => getBuffer());

  const startRecording = async () => {
    audioBuffer.reset();

    window.navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        const startMic = new mic();

        startMic.setStream(stream);
        startMic.on("data", (chunk) => {
          var raw = mic.toRaw(chunk);
          if (raw == null) {
            return;
          }
          audioBuffer.addData(raw);
        });

        setRecording(true);
        setMicStream(startMic);
      });
  };

  const stopRecording = async () => {
    micStream.stop();
    setMicStream(null);
    setRecording(false);

    const resultBuffer = audioBuffer.getData();

    if (typeof finishRecording === "function") {
      finishRecording(resultBuffer);
    }
  };

  return (
    <div>
      <div className={classes.recBtnContainer}>
        <MuiThemeProvider theme={theme}>
          <Button
            disabled={!recording}
            variant="contained"
            color="primary"
            onClick={stopRecording}
            hidden={true}
          >
            Stop recording
          </Button>
          <Button
            disabled={recording}
            variant="contained"
            color="primary"
            onClick={startRecording}
            hidden={true}
          >
            Start recording
          </Button>
        </MuiThemeProvider>
      </div>
    </div>
  );
};

export default AudioRecorder;

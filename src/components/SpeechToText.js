import React, { useState } from "react";
import { Predictions } from "aws-amplify";

import GaugeChart from "react-gauge-chart";
import JSONPretty from "react-json-pretty";

import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import AudioRecorder from "./components/AudioRecorder";

/** Convert speech to text  */
const SpeechToText = ({ classes }) => {
  const [response, setResponse] = useState("");
  const [percent, setPercent] = useState(0);

  /** Convert recorded audio to text using Amazon Transcribe   */
  const convertFromBuffer = (bytes) => {
    setResponse("Performing Sentiment Analysis...");

    Predictions.convert({
      transcription: {
        source: {
          bytes,
        },
        language: "en-US",
      },
    })
      .then(({ transcription: { fullText } }) => {
        console.log(fullText);
        interpretFromPredictions(JSON.stringify(fullText, null, 2));
      })
      .catch((err) => console.log(JSON.stringify(err, null, 2)));
  };

  /** apply sentiment analysis on converted text using Amazon Comprehend */
  const interpretFromPredictions = (textToInterpret) => {
    Predictions.interpret({
      text: {
        source: {
          text: textToInterpret,
        },
        type: "ALL",
      },
    })
      .then((result) => {
        var textToDisplay =
          textToInterpret + "\n\n" + JSON.stringify(result, null, 2);
        setResponse(textToDisplay);
        setGauge(result);
      })
      .catch((err) => setResponse(JSON.stringify(err, null, 2)));
  };

  const setGauge = (result) => {
    if (result.textInterpretation.sentiment.predominant === "POSITIVE") {
      setPercent(0.83);
    } else if (result.textInterpretation.sentiment.predominant === "NEGATIVE") {
      setPercent(0.17);
    } else if (result.textInterpretation.sentiment.predominant === "NEUTRAL") {
      setPercent(0.5);
    }
  };

  return (
    <div className={classes.container}>
      <AudioRecorder classes={classes} finishRecording={convertFromBuffer} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className={classes.chartDivStyle}>
            <GaugeChart
              id="gauge-chart1"
              className={classes.chartStyle}
              nrOfLevels={20}
              percent={percent}
              hideText={true}
              colors={["#FF0000", "#FFFF00", "#00FF00"]}
            />
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className={classes.textContainer}>
            <Typography
              display="initial"
              noWrap={true}
              align="left"
              variant="h6"
              gutterBottom
            >
              <JSONPretty id="json-pretty" data={response}></JSONPretty>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SpeechToText;

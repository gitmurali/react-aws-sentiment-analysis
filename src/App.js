import React from "react";
import { useStyles } from "./styles/styles";
import "./App.css";

import SpeechToText from "./components/SpeechToText";

import { Amplify } from "aws-amplify";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1>Sentiment Analysis On Voice Data</h1>
        <SpeechToText classes={classes} />
      </div>
    </div>
  );
}

export default withAuthenticator(App, {
  includeGreetings: true,
});

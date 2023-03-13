import { createTheme, makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

export const theme = createTheme({
  palette: {
    primary: green,
  },
});

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  container: {
    fontFamily:
      'Roboto,\n                "Helvetica Neue",\n                Arial,\n                sans-serif,\n',
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#212529",
    textAlign: "center",
    paddingLeft: "15px",
    paddingRight: "15px",
    height: "100%",
  },
  recBtnContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "30px 10px 30px 10px",
  },
  gaugeContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "30px 10px 30px 10px",
    height: "100%",
  },
  textContainer: {
    padding: "5px 5px 5px 5px",
    border: "3px solid transparent",
    borderColor: "#ccc",
    width: "70%",
    height: "65%",
    textAlign: "left",
    overflow: "auto",
  },
  chartStyle: {
    height: 250,
  },
  chartDivStyle: {
    height: 300,
    width: 540,
    border: 3,
  },
}));

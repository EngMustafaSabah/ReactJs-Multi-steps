import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppBar,Box, Toolbar, Typography, Container } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <AppBar>
      <Toolbar>
        <Typography varient="h6">React Steps</Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xs">
      <Box mt={10}>
        <App />
      </Box>
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

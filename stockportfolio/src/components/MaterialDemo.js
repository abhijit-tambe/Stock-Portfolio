import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const usestyles = makeStyles({
  helloStyle: {
    fontStyle: "oblique",
  },
  buttonStyle: {
    color: "black",
    // border: 0,
  },
});

function MaterialDemo() {
  const classes = usestyles();
  return (
    <div className="mdemo">
      <Typography variant="h1" className={classes.helloStyle}>
        Hellooooo
      </Typography>
      <Button
        className={classes.buttonStyle}
        onClick={() => {
          alert("you clicked");
        }}
        variant="outlined"
        color="secondary"
      >
        click me
      </Button>
    </div>
  );
}

export default MaterialDemo;

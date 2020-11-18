import React from "react";
import classes from "./Layout.module.css";
const layout = (props) => {


  return props.show ? (
    <div
      className={classes.layout}
      onClick={props.clicked}
    ></div>
  ) : null;
};
export default layout;

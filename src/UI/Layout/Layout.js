import React from "react";
import classes from "./Layout.module.css";
const layout = (props) => {
  const ModalExit = (event) => {
    event = event || window.event;
    if (event.keyCode === "Escape") {
      props.pressed();
    }
  };

  return props.show ? (
    <div
      className={classes.layout}
      onClick={props.clicked}
      onKeyDown={ModalExit}
    ></div>
  ) : null;
};
export default layout;

import React from "react";
import classes from "./Layout.module.css";
const layout = (props) => {

const exitHandler =(event)=>
{
  console.log("HIIIIII")
  if(event.key === 27)
  {
    props.exit();
  }
}
  return props.show ? (
    <div
      className={classes.layout}
      onClick={props.clicked}
      onKeyDown={exitHandler}
    ></div>
  ) : null;
};
export default layout;

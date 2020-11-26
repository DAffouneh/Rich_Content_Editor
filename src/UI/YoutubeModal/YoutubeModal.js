import React from "react";
import classes from "./YoutubeModal.module.css";
import Layout from "../Layout/Layout";
const YoutubeModal = (props) => {
  return (
    // props.show && (
      <div style={{position:"absolute",bottom: "65px",
      left: "100px"}}>
      <div>
          <Layout
            show={props.show}
            clicked={props.modalClosed}
            exit={props.modalExit}
          />
          <div>
            <div className={classes.Modal}>{props.children}</div>
          </div>
        </div>
        <div className={classes.Triangle}></div>
      </div>
    )
 // );
};

export default YoutubeModal;

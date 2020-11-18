import React from "react";
import classes from "./YoutubeModal.module.css";
import Layout from "../Layout/Layout";
import classes1 from "../../App.module.css";
const YoutubeModal = (props) => {
  return (
    props.show && (
      <div>
        <div>
          <Layout
            show={props.show}
            clicked={props.modalClosed}
          />
          <div>
            <div className={classes.Modal}>{props.children}</div>
          </div>
        </div>
        <div className={classes.Triangle}></div>
      </div>
    )
  );
};

export default YoutubeModal;

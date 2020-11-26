import React, { useState, useEffect } from "react";
import style from "./footer-bar.module.css";

const FooterBar = (props) => {
  const { plugins } = props;

  return ( 
  <div className={style.FooterBarContainer}>
    {plugins.map((plugin, index) => {
        return (
        <div>
        {plugin.modal}
        <img key={index} className={style.pluginIconContainer} src={plugin.icon}></img>
        </div>
        );
    })}
</div>)
;
  
 
};

export default FooterBar;

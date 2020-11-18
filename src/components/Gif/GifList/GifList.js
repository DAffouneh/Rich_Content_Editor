import classes from "./GifList.module.css";
import React from "react";
import GifItem from "../GifItem/GifItem";
const GifList = ({ gifs }) => {
  const gifItems = gifs.map((gif) => {
    return (
      <div key={gif.id}>
        <GifItem gif={gif} />
      </div>
    );
  });
  return (
    <div className={classes.OutterDiv}>
      <div className={classes.InnerDiv}>{gifItems}</div>
    </div>
  );
};

export default GifList;

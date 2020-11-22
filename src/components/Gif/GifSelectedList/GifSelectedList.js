import React from "react";
import GifDetail from "../GifDetails/GifDetails";
import classes from "./GifSelectedList.module.css";
const GifSelectedList = ({ gifs }) => {
  const GifSelected = gifs.map((gif) => {
    return (
      <div key={gif.id}>
        <GifDetail gif={gif} />
      </div>
    );
  });
  return (
      <div className={classes.selectedGif}>{GifSelected}</div>
  );
};
export default GifSelectedList;

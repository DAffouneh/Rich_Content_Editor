import React from "react";
import classes from "./GifItem.module.css";
const GifItem = ({ gif }) => {
  const gifImageInfo = gif.images.fixed_height_small;
  return (
    <div className={classes.GifContainer}>
      <img
        src={gifImageInfo.url}
        alt={gifImageInfo.slug}
        height={gifImageInfo.height}
        width="125"
      />
    </div>
  );
};
export default GifItem;

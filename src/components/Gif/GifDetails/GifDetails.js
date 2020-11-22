import React from "react";
import classes from "./GifDetails.module.css";
const GifDetails = ({ gif }) => {
  if (!gif) {
    return <div></div>;
  }
  const gifImageInfo = gif.images.fixed_height_small;
  return (
    <div className={classes.Frame}>
      <img
        src={gifImageInfo.url}
        alt={gifImageInfo.slug}
        height={gifImageInfo.height}
        width="125"
      />
    </div>
  );
};
export default GifDetails;

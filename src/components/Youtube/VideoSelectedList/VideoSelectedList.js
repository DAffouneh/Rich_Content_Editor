import React from "react";
import VideoDetail from "../VideoDetail/VideoDetail";
import GifDetail from "../../Gif/GifDetails/GifDetails";
import classes from "./VideoSelectedList.module.css";

const VideoSelectedList = ({ items, flag }) => {
  let GifSelected = null;

  if (flag === "video") {
    GifSelected = items.map((item) => {
      console.log(item)
      return (
        <div key={item.id.videoId}>
          <VideoDetail video={item} />
        </div>
      );
    });
  }
  else  {
    GifSelected = items.map((item) => {
      console.log(item)
      return (
        <div key={item.id}>
          <GifDetail gif={item} />
        </div>
      );
    });
  } 
  return (
    <div className={classes.OuterDiv}>
      <div className={classes.InnerDiv}>{GifSelected}</div>
    </div>
  );
};
export default VideoSelectedList;

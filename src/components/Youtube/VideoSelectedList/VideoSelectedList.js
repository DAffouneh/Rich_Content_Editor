import React from "react";
import VideoDetail from "../VideoDetail/VideoDetail";
import GifDetail from "..//GifDetails/GifDetails";
import classes from "./VideoSelectedList.module.css";

const VideoSelectedList = ({ item, flag }) => {
  const videoSelected = item.map((item) => {
    
    return (
      flag === 'video' ?
      <div key={item.id.videoId}>
        <VideoDetail video={item} />
      </div> : flag === 'gif' &&
      
      <div key={item.id}>
      <GifDetail gif={item} />
    </div> 

    );
  });
  return (
    <div className={classes.OuterDiv}>
      <div className={classes.InnerDiv}>{videoSelected}</div>
    </div>
  );
};
export default VideoSelectedList;

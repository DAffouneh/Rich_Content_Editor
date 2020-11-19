import React from "react";
import VideoDetail from "../VideoDetail/VideoDetail";
import classes from "./VideoSelectedList.module.css";
const VideoSelectedList = ({ videos }) => {
  const videoSelected = videos.map((video) => {
    return (
      <div key={video.id.videoId}>
        <VideoDetail video={video} />
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

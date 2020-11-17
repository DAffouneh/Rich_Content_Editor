import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import YoutubeModal from "./UI/YoutubeModal/YoutubeModal";
import YoutubeSearchBar from "./components/Youtube/YoutubeSearchBar/YoutubeSearchBar";
import VideoList from "./components/Youtube/VideoList/VideoList";
import Spinner from "./UI/Spinner/Spinner";
import VideoDetail from "./components/Youtube/VideoDetail/VideoDetail";
import YoutubeIcon from "./YouTube.svg";
import GifIcon from "./Gif.svg";
import classes from "./App.module.css";
const App = () => {
  const KEY = "AIzaSyBF7B3vRbpyX-UgpQQBurWRcj2oAcwyvCU";
  const [pageToken, setPageToken] = useState("CAoQAA");
  const [videos, setVideos] = useState([]);
  const [term, setTerm] = useState("");
  const [show, setShow] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    searchHandler(term);
  }, []);

  const searchHandler = (termFromSearchBar) => {
    setVideos([]);
    setTerm(termFromSearchBar);
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&order=viewCount&pageToken=${pageToken}&q=${termFromSearchBar}&type=video&key=${KEY}`
      )
      .then((res) => {
        setPageToken(res.data.nextPageToken);
        setVideos([...res.data.items]);
      });
  };

  const loadMore = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&order=viewCount&pageToken=${pageToken}&q=${term}&type=video&key=${KEY}`
      )
      .then((res) => {
        setPageToken(res.data.nextPageToken);
        setVideos([...videos, ...res.data.items]);
      });
  };

  const ModalShow = () => {
    setShow(!show);
    if (show == false) {
      setTerm("");
      searchHandler("");
    }
    setShowVideo(false);
  };

  const modalremovalHandler = () => {
    setShow(false);
    if (show == false) {
      searchHandler("");
    }
  };
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setShowVideo(true);
  };

  const spinner = <Spinner></Spinner>;
  let display = null;
  if (showVideo) {
    display = (
      <div className={classes.VideoDiv}>
        <VideoDetail video={selectedVideo} />
      </div>
    );
  } else {
    display = (
      <YoutubeModal
        show={show}
        modalClosed={modalremovalHandler}
        modalExitClosed={modalremovalHandler}
      >
        <YoutubeSearchBar
          clickSearchHandeler={searchHandler}
          term={term}
        ></YoutubeSearchBar>

        <InfiniteScroll
          dataLength={videos.length}
          next={loadMore}
          height={"280px"}
          hasMore={true}
          loader={spinner}
          scrollThreshold={0.9}
          className={classes.Scroll}
        >
          <VideoList videos={videos} handleVideoSelect={handleVideoSelect} />
        </InfiniteScroll>
      </YoutubeModal>
    );
  }
  return (
    <div style={{ position: "fixed", top: "199px", left: "12px" }}>
      {display}
      <div style={{ position: "absolute" }}>
        <div className={classes.footer}>
          <img
            className={classes.youtube_icon}
            src={YoutubeIcon}
            onClick={ModalShow}
            alt="Youtube"
          ></img>
          <img src={GifIcon}></img>
        </div>
      </div>
    </div>
  );
};

export default App;

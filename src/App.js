import React, { useState, useEffect } from "react";
import FooterBar from './components/footer-bar/footer-bar';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Input from "react-delay-input";
import Youtube from "./components/Youtube/Youtube";
import Gif from "./components/Gif/Gif";
import YoutubeSearchBar from "./components/Youtube/YoutubeSearchBar/YoutubeSearchBar";
import VideoSelectedList from "./components/Youtube/VideoSelectedList/VideoSelectedList";
import VideoList from "./components/Youtube/VideoList/VideoList";
import GifList from "./components/Gif/GifList/GifList";
import Spinner from "./UI/Spinner/Spinner";
import GifModal from "./UI/GifModal/GifModal";
import YoutubeModal from "./UI/YoutubeModal/YoutubeModal";
import classes from "./App.module.css";
import YoutubeIcon from "./YouTube.svg";
import GifIcon from "./Gif.svg";
import Search from "./search.svg";
import Cancel from "./cancel.svg";
import copyright from "./copyright.svg";

var GphApiClient = require("giphy-js-sdk-core");
const App = () => {
console.log(process.env);
  // const KEY = "AIzaSyC0lAY7iOLOZypsCZsp_yTU41BT0tRZ9Ac";
  // const [pageToken, setPageToken] = useState("CAoQAA");
  // const [paginate, setPaginate] = useState(0);
  // const [videos, setVideos] = useState([]);
  // const [selectedVideos, setSelectedVideos] = useState([]);
  // const [gifs, setGifs] = useState([]);
  // const [term, setTerm] = useState("");
  // const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  // const [showGifModal, setshowGifModal] = useState(false);
  // const [showVideo, setShowVideo] = useState(false);
  // const [showGif, setShowGif] = useState(false);
  // const [gifTermSearch, setGifTermSearch] = useState("");
  // const [error, setError] = useState("");
  // const [flag, setFlag] = useState(null);
  // const giphy = GphApiClient("6KcE3OAJhPm3KrUtKUait8PaBac1v3Fq");

  // useEffect(() => {
  //   searchHandler(term);
  //   loadFeed();
  // }, []);

  // const searchHandler = (termFromSearchBar) => {
  //   setVideos([]);
  //   setTerm(termFromSearchBar);
  //   axios
  //     .get(
  //       `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&order=viewCount&pageToken=${pageToken}&q=${termFromSearchBar}&type=video&key=${KEY}`
  //     )
  //     .then((res) => {
  //       if (res.data.items.length === 0) {
  //         setError("NO RESULTS");
  //       } else {
  //         setPageToken(res.data.nextPageToken);
  //         setVideos([...res.data.items]);
  //         setError("");
  //       }
  //     })
  //     .catch((err) => {
  //       setError("CONNECTION ERROR!");
  //     });
  // };

  // const loadMore = () => {
  //   axios
  //     .get(
  //       `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&order=viewCount&pageToken=${pageToken}&q=${term}&type=video&key=${KEY}`
  //     )
  //     .then((res) => {
  //       setPageToken(res.data.nextPageToken);
  //       setVideos([...videos, ...res.data.items]);
  //     })
  //     .catch((err) => {});
  // };
  // const loadFeed = () => {
  //   giphy.trending();
  //   giphy.trending("gifs", { offset: paginate }).then((response) => {
  //     setGifs([]);
  //     setGifs(response.data);
  //   });
  // };

  // const search = (gifTermSearch) => {
  //   if (gifTermSearch === "") return;

  //   giphy.search("gifs", { q: gifTermSearch }).then((response) => {
  //     setGifs(response.data);
  //   });
  // };

  // const ModalShow = () => {
  //   setShowYoutubeModal(!showYoutubeModal);
  //   if (showYoutubeModal === false) {
  //     setTerm("");
  //     searchHandler("");
  //   }
  // };

  // const modalremovalHandler = () => {
  //   setShowYoutubeModal(false);
  //   setshowGifModal(false);

  //   if (showYoutubeModal === false) {
  //     searchHandler("");
  //   }
  // };
  // const handleVideoSelect = (video) => {
  //   let shownVideos = selectedVideos;
  //   shownVideos.push(video);
  //   setSelectedVideos(shownVideos);
  //   setFlag("video");
  //   setShowVideo(true);
  // };

  // const handleGifSelect = (gif) => {
  //   let shownGifs = selectedVideos;
  //   shownGifs.push(gif);
  //   setSelectedVideos(shownGifs);
  //   setShowGif(true);
  //   setFlag("gif");
  // };

  // const onSearchChange = (event) => {
  //   setGifTermSearch(event.target.value);
  //   search(event.target.value);
  // };

  // const loadMoreGifs = () => {
  //   setPaginate(paginate + 6);
  //   loadFeed();
  // };

  // const gifModalShow = () => {
  //   setshowGifModal(!showGifModal);
  // };
  // const deleteSearchValue = () => {
  //   setGifTermSearch("");
  //   loadFeed();
  // };

  // let cancel = null;
  // if (gifTermSearch !== "" && gifTermSearch !== "Search GIPHY...") {
  //   cancel = (
  //     <img
  //       src={Cancel}
  //       className={classes.CancelImg}
  //       onClick={deleteSearchValue}
  //     ></img>
  //   );
  // }

  // const spinner = <Spinner></Spinner>;
  // let display = null;
  // let gifdisplay = null;
  // if (showGif || showVideo) {
  //   gifdisplay = (
  //     <div className={classes.slectedItems}>
  //       <p>Selected Items </p>
  //       <VideoSelectedList items={selectedVideos} flag={flag} />
  //     </div>
  //   );
  // }

  
  // if (showGifModal) {
  //   display = (
  //     <div className={classes.gifmodalContainer}>
  //       <GifModal
  //         show={showGifModal}
  //         modalClosed={modalremovalHandler}
  //         modalExit={modalremovalHandler}
  //       >
  //         <img src={Search} className={classes.SearchImg}></img>
  //         <Input
  //           className={classes.Input}
  //           type="text"
  //           placeholder={"Search GIPHY..."}
  //           value={gifTermSearch}
  //           minLength={1}
  //           delayTimeout={300}
  //           onChange={onSearchChange}
  //         ></Input>
  //         {cancel}
  //         <div className={classes.copyRight}>
  //           <img src={copyright} className={classes.CopyRightImg}></img>
  //           <p className={classes.copyText}>2020 GIPHY , Inc.</p>
  //         </div>
  //         <InfiniteScroll
  //           dataLength={gifs.length}
  //           next={loadMoreGifs}
  //           height={"200px"}
  //           hasMore={true}
  //           loader={spinner}
  //           scrollThreshold={0.6}
  //           className={classes.Scroll}
  //         >
  //           <GifList gifs={[...gifs]} handleGifSelect={handleGifSelect} />
  //         </InfiniteScroll>
  //       </GifModal>
  //     </div>
  //   );
  // }

  const plugins = [
    {
      modal: <Youtube/>,
      icon: YoutubeIcon,
    },
    {
      modal: <Gif/>,
      icon: GifIcon
    }
  ]

  return (
    <div>
      {/* {gifdisplay} */}
      <FooterBar plugins={plugins}/>
     
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import YoutubeModal from "./UI/YoutubeModal/YoutubeModal";
import GifModal from './UI/GifModal/GifModal';
import YoutubeSearchBar from "./components/Youtube/YoutubeSearchBar/YoutubeSearchBar";
import VideoList from "./components/Youtube/VideoList/VideoList";
import Spinner from "./UI/Spinner/Spinner";
import VideoDetail from "./components/Youtube/VideoDetail/VideoDetail";
import YoutubeIcon from "./YouTube.svg";
import GifIcon from "./Gif.svg";
import classes from "./App.module.css";
import GifList from './components/Gif/GifList/GifList';
import Search from "./search.svg";
import Cancel from "./cancel.svg";

var GphApiClient = require("giphy-js-sdk-core");
const App = () => {
  const KEY = "AIzaSyAMiwTc0WUts2rjpiNX3zI_vk04w6s_SUU";
  const [pageToken, setPageToken] = useState("CAoQAA");
  const [paginate,setPaginate]=useState(0);
  const [videos, setVideos] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [term, setTerm] = useState("");
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showGifModal,setshowGifModal]=useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const[gifTermSearch,setGifTermSearch]=useState("");
  const[error,setError]=useState("");
  const giphy= GphApiClient("ybaPDWvW02i61gblWgdFkxkrsfhsZzhi");

  useEffect(() => {
    searchHandler(term);
    loadFeed();
  }, []);

  const searchHandler = (termFromSearchBar) => {
    setVideos([]);
    setTerm(termFromSearchBar);
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&order=viewCount&pageToken=${pageToken}&q=${termFromSearchBar}&type=video&key=${KEY}`
      )
      .then((res) => {
        if(res.data.length===0)
        {
          setError("NO RESULTS");
        }
        else {
          setPageToken(res.data.nextPageToken);
          setVideos([...res.data.items]);
        }
        
      }).catch((err)=> 
      {
        setError("CONNECTION ERROR!")
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
        
      })
      .catch((err)=>{

      });
  };
  const loadFeed = () => {
    giphy.trending();
    giphy.trending("gifs", { offset: paginate }).then((response) => {
      setGifs([]);
      setGifs(response.data);
    });
  };

  const search = (event) => {
    event.preventDefault();
    setGifTermSearch(event.target.value);
    if (gifTermSearch === "") return;

    giphy.search("gifs", { q: gifTermSearch }).then((response) => {
      setGifs(response.data);
    });
  };

  const ModalShow = () => {
    setShowYoutubeModal(!showYoutubeModal);
    if (showYoutubeModal == false) {
      setTerm("");
      searchHandler("");
    }
    setShowVideo(false);
  };

  const modalremovalHandler = () => {
    setShowYoutubeModal(false);
    setshowGifModal(false);

    if (showYoutubeModal == false) {
      searchHandler("");
    }
  };
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setShowVideo(true);
  };


  const onSearchChange = (event) => {
    event.stopPropagation();
    updateQuery(event);
  };
  const updateQuery = (event) => {
    setGifTermSearch(event.target.value);
    search(event);
  };
  const loadMoreGifs = () => {
    setPaginate(paginate + 6);
    loadFeed();
  };

  const gifModalShow = () => {
    setshowGifModal(!showGifModal);
  };
  const deleteSearchValue = () => {
    setGifTermSearch("")  
      loadFeed();
    };

  let cancel = null;
  if (gifTermSearch !== "" && gifTermSearch !== "Search GIPHY...") {
    cancel = (
      <img
        src={Cancel}
        className={classes.CancelImg}
        onClick={deleteSearchValue}
      ></img>
    );
  }

  const spinner = <Spinner></Spinner>;
  let display = null;
  if (showVideo) {
    display = (
      <div className={classes.VideoDiv}>
        <VideoDetail video={selectedVideo} />
      </div>
    );
  } else if(showYoutubeModal){
    // if(error !== "")
    // {
    //   <YoutubeModal
    //     show={showYoutubeModal}
    //     modalClosed={modalremovalHandler}
    //     modalExitClosed={modalremovalHandler}
    //   >
    //     <YoutubeSearchBar
    //       clickSearchHandeler={searchHandler}
    //       term={term}
    //     ></YoutubeSearchBar>
    //     <p>{error}</p>
    //     </YoutubeModal>
    // }
    // else{
      display = (
        <YoutubeModal
          show={showYoutubeModal}
          modalClosed={modalremovalHandler}
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
    
    
  } else if(showGifModal)
  {
    display = (
      <div  style={{
        position:"absolute",
        top: "-2px;",
        left: "123px"
      }}>
<GifModal
        show={showGifModal}
        modalClosed={modalremovalHandler}
       
      >
        <img src={Search} className={classes.SearchImg}></img>
       <input
          className={classes.Input}
          type="text"
          placeholder={"Search GIPHY..."}
          value={gifTermSearch}
          onChange={onSearchChange}
        ></input>
        {cancel}
        <InfiniteScroll
          dataLength={gifs.length}
          next={loadMoreGifs}
          height={"230px"}
          hasMore={true}
          loader={spinner}
          scrollThreshold={0.6}
          className={classes.Scroll}
        >
          <GifList gifs={[...gifs]} />
        </InfiniteScroll>
      </GifModal>
      </div>
        
      
    );

  }
  return (
    <div style={{ position: "fixed", top: "199px" }}>
      {display}
        <div className={classes.footer}>
          <img
            className={classes.youtube_icon}
            src={YoutubeIcon}
            onClick={ModalShow}
            alt="Youtube"
          ></img>
          <img src={GifIcon}
          onClick={gifModalShow}
          ></img>
        </div>
      </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import YoutubeModal from "./UI/YoutubeModal/YoutubeModal";
import GifModal from './UI/GifModal/GifModal';
import YoutubeSearchBar from "./components/Youtube/YoutubeSearchBar/YoutubeSearchBar";
import VideoList from "./components/Youtube/VideoList/VideoList";
import Spinner from "./UI/Spinner/Spinner";
import YoutubeIcon from "./YouTube.svg";
import GifIcon from "./Gif.svg";
import classes from "./App.module.css";
import GifList from './components/Gif/GifList/GifList';
import Search from "./search.svg";
import Cancel from "./cancel.svg";
import VideoSelectedList from "./components/Youtube/VideoSelectedList/VideoSelectedList";
import GifSelectedList from "./components/Gif/GifSelectedList/GifSelectedList";
import copyright from "./copyright.svg";
import Input from 'react-delay-input';

var GphApiClient = require("giphy-js-sdk-core");
const App = () => {
  const KEY = "AIzaSyC0lAY7iOLOZypsCZsp_yTU41BT0tRZ9Ac";
  const [pageToken, setPageToken] = useState("CAoQAA");
  const [paginate,setPaginate]=useState(0);
  const [videos, setVideos] = useState([]);
  const[selectedVideos]=useState([]);
  const [gifs, setGifs] = useState([]);
  const [term, setTerm] = useState("");
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedGif,setSelectedGif]=useState(null);
  const[selctedGifs]=useState([]);
  const [showGifModal,setshowGifModal]=useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showGif,setShowGif]= useState(false);
  const[gifTermSearch,setGifTermSearch]=useState("");
  const[error,setError]=useState("");
  const giphy= GphApiClient("6KcE3OAJhPm3KrUtKUait8PaBac1v3Fq");

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
        if(res.data.items.length===0)
        {
          setError("NO RESULTS");
        }
        else {
          setPageToken(res.data.nextPageToken);
          setVideos([...res.data.items]);
          setError("")

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

  const search = (gifTermSearch) => {
    if (gifTermSearch === "") return;

    giphy.search("gifs", { q: gifTermSearch }).then((response) => {
      setGifs(response.data);
    });
  };

  const ModalShow = () => {
    setShowYoutubeModal(!showYoutubeModal);
    if (showYoutubeModal === false) {
      setTerm("");
      searchHandler("");
    }
  };

  const modalremovalHandler = () => {
    setShowYoutubeModal(false);
    setshowGifModal(false);

    if (showYoutubeModal === false) {
      searchHandler("");
    }
  };
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    selectedVideos.push(video);
    setShowVideo(true);
  };

  const handleGifSelect =(gif)=> 
  {
setSelectedGif(gif);
selctedGifs.push(gif);
setShowGif(true)

  }



  const onSearchChange = (event) => {
   setGifTermSearch(event.target.value);
   search(event.target.value);
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
  let gifdisplay=null;

  if(showGif || showVideo)
  {
    gifdisplay= <div className={classes.slectedItems}>
      <p>Selected Items </p>
            <VideoSelectedList videos={selectedVideos} />
            <GifSelectedList gifs={selctedGifs} />


    </div>

  }

  if(showYoutubeModal){
    if(error !== "")
    {
      display=<div className={classes.youtubeModalContainer}>
      <YoutubeModal
        show={showYoutubeModal}
        modalClosed={modalremovalHandler}
        modalExitClosed={modalremovalHandler}
      >
        <YoutubeSearchBar
          clickSearchHandeler={searchHandler}
          term={term}
        ></YoutubeSearchBar>
        <div className={classes.error}>{error}</div>
        </YoutubeModal>
        </div>
    }
    else{
      display = (
        <div className={classes.youtubeModalContainer}>
        <YoutubeModal
          show={showYoutubeModal}
          modalClosed={modalremovalHandler}
          modalExit={modalremovalHandler}
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
        </div>

      );
     }
    
  } else if(showGifModal)
  {
    display = (
              <div className={classes.gifmodalContainer}>
<GifModal
        show={showGifModal}
        modalClosed={modalremovalHandler}
        modalExit={modalremovalHandler}

       
      >
        <img src={Search} className={classes.SearchImg}></img>
       <Input
          className={classes.Input}
          type="text"
          placeholder={"Search GIPHY..."}
          value={gifTermSearch}
          minLength={1}
          delayTimeout={300}
          onChange={onSearchChange}
        ></Input>
        {cancel}
        <div className={classes.copyRight}><img src={copyright}
        className={classes.CopyRightImg}
        ></img>
        <p className={classes.copyText}>2020 GIPHY , Inc.</p></div>
        <InfiniteScroll
          dataLength={gifs.length}
          next={loadMoreGifs}
          height={"200px"}
          hasMore={true}
          loader={spinner}
          scrollThreshold={0.6}
          className={classes.Scroll}
        >
          <GifList gifs={[...gifs]} handleGifSelect={handleGifSelect} />
        </InfiniteScroll>
      </GifModal>
        </div>
      
    );

  }

  return (
    <div>
      {gifdisplay}
      <div className={classes.footer}>
          {display}
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

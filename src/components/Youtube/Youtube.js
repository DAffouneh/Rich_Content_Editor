import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import YoutubeModal from "../../UI/YoutubeModal/YoutubeModal";
import YoutubeSearchBar from "../../components/Youtube/YoutubeSearchBar/YoutubeSearchBar";
import classes from './Youtube.module.css';
import Spinner from "../../UI//Spinner/Spinner";
import VideoList from "./VideoList/VideoList";
const YouTube = () =>
{
    const KEY= process.env.REACT_APP_YOUTUBE_API_KEY
    const [pageToken, setPageToken] = useState("CAoQAA");
    const [videos, setVideos] = useState([]);
    const [youtubeSerachTerm, setYoutubeSerachTerm] = useState("");
    const [error, setError] = useState("");
    const [showYoutubeModal, setShowYoutubeModal] = useState(true);

    useEffect(() => {
        searchHandler(youtubeSerachTerm);
      }, []);

      const searchHandler = (termFromSearchBar) => {
        setVideos([]);
        setYoutubeSerachTerm(termFromSearchBar);
        axios
          .get(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&order=viewCount&pageToken=${pageToken}&q=${termFromSearchBar}&type=video&key=${KEY}`
          )
          .then((res) => {
            if (res.data.items.length === 0) {
              setError("NO RESULTS");
            } else {
              setPageToken(res.data.nextPageToken);
              setVideos([...res.data.items]);
              setError("");
            }
          })
          .catch((err) => {
            setError("CONNECTION ERROR!");
          });
      };
    
      const loadMore = () => {
        axios
          .get(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&order=viewCount&pageToken=${pageToken}&q=${youtubeSerachTerm}&type=video&key=${KEY}`
          )
          .then((res) => {
            setPageToken(res.data.nextPageToken);
            setVideos([...videos, ...res.data.items]);
          })
          .catch((err) => {});
      };

      const modalremovalHandler = () => {
        setShowYoutubeModal(false);    
        if (showYoutubeModal === false) {
          searchHandler("");
        }
      };
let spinner = <Spinner/>
let displayYoutubeModal=null;
      if (error !== "") {
        displayYoutubeModal = (
          <div className={classes.youtubeModalContainer}>
            <YoutubeModal
              show={showYoutubeModal}
              modalClosed={modalremovalHandler}
              modalExitClosed={modalremovalHandler}
            >
              <YoutubeSearchBar
                clickSearchHandeler={searchHandler}
                term={youtubeSerachTerm}
              ></YoutubeSearchBar>
              <div className={classes.error}>{error}</div>
            </YoutubeModal>
          </div>
        );
      } else {
        displayYoutubeModal = (
          <div >
          
              <YoutubeSearchBar
                clickSearchHandeler={searchHandler}
                term={youtubeSerachTerm}
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
                <VideoList
                  videos={videos}
                 // handleVideoSelect={handleVideoSelect}
                />
              </InfiniteScroll>
          </div>
        );
        }
return (
    <YoutubeModal
    show={showYoutubeModal}
    modalClosed={modalremovalHandler}
    modalExit={modalremovalHandler}
   >
         {displayYoutubeModal}
         </YoutubeModal>

);
}
export default YouTube;
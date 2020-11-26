import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GifModal from "../../UI/GifModal/GifModal";
import Input from "react-delay-input";
import Spinner from "../../UI/Spinner/Spinner";
import Cancel from "../../cancel.svg";
import classes from "./Gif.module.css";
import Search from "../../search.svg";
import copyright from "../../copyright.svg";
import GifList from "../Gif/GifList/GifList";
var GphApiClient = require("giphy-js-sdk-core");
const Gif = () =>
{
    const [paginate, setPaginate] = useState(0);
    const [gifs, setGifs] = useState([]);
    const [gifTermSearch, setGifTermSearch] = useState("");
    const [showGifModal, setshowGifModal] = useState(false);
    const giphy = GphApiClient(process.env.REACT_APP_GIPHY_API_KEY);
    useEffect(() => {
        loadFeed();
      }, []);


      const search = (gifTermSearch) => {
        if (gifTermSearch === "") return;
    
        giphy.search("gifs", { q: gifTermSearch }).then((response) => {
          setGifs(response.data);
        });
      };
      const loadFeed = () => {
        giphy.trending();
        giphy.trending("gifs", { offset: paginate }).then((response) => {
          setGifs([]);
          setGifs(response.data);
        });
      };

      const onSearchChange = (event) => {
        setGifTermSearch(event.target.value);
        search(event.target.value);
      };
    
      const loadMoreGifs = () => {
        setPaginate(paginate + 6);
        loadFeed();
      };

      const deleteSearchValue = () => {
        setGifTermSearch("");
        loadFeed();
      };

      const modalremovalHandler = () => {
        setshowGifModal(false);
    
    
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
      let spinner=<Spinner></Spinner>
      let displayGifModal=null;
      displayGifModal = (
        <div className={classes.gifmodalContainer}>
        
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
            <div className={classes.copyRight}>
              <img src={copyright} className={classes.CopyRightImg}></img>
              <p className={classes.copyText}>2020 GIPHY , Inc.</p>
            </div>
            <InfiniteScroll
              dataLength={gifs.length}
              next={loadMoreGifs}
              height={"200px"}
              hasMore={true}
              loader={spinner}
              scrollThreshold={0.6}
              className={classes.Scroll}
            >
              <GifList
               gifs={[...gifs]} 
             // handleGifSelect={handleGifSelect} 
              />
            </InfiniteScroll>
        </div>
      );

    return(
        <GifModal
        show={showGifModal}
        modalClosed={modalremovalHandler}
        modalExit={modalremovalHandler}
      >
            {displayGifModal}
            </GifModal>

    );
}
export default Gif;
import logo from './logo.svg';
import YoutubeIcon from './YouTube.svg';
import GifIcon from './Gif.svg';
import './App.css';
import classes from './UI/Footer/Footer.module.css';

function App() {
  return (
    <div className="App">
           <div className={classes.footer}>
        <img className={classes.youtube_icon} src={YoutubeIcon}></img>
        <img src={GifIcon}></img>

    </div>
    </div>
  );
}

export default App;

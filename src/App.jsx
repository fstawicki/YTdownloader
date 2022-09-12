import { useState, Fragment } from 'react';
import axios from "axios";

import { BsYoutube } from "react-icons/bs";

import './App.css';

function App() {

  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [linkMP3, setLinkMP3] = useState('');
  const [link144p, setLink144p] = useState('');
  const [link240p, setLink240p] = useState('');
  const [link360p, setLink360p] = useState('');
  const [link480p, setLink480p] = useState('');
  const [link720p, setLink720p] = useState('');
  const [link1080p, setLink1080p] = useState('');

  const [videoName, setVideoName] = useState('');
  const [link, setLink] = useState('');
  const [videoImage, setVideoImage] = useState('');
  const [videoDuration, setVideoDuration] = useState('');

  const getInput = (e) => {
    setInput(e.target.value);
  }

  const clearInput = () => {
    setInput('');
  }

  const convertLink = async () => {
    const options = {
      method: 'GET',
      url: 'https://yt-downloader1.p.rapidapi.com/api',
      params: {
        url: `${input}`,
        key: '5145f7563cd789876e861e2dba4d15763501c84256ae3ac182116233173acaf0'
      },
      headers: {
        'X-RapidAPI-Key': '07a19c7e9dmsh50130fa6b3ddc06p1d5f81jsn1a5672834a7a',
        'X-RapidAPI-Host': 'yt-downloader1.p.rapidapi.com'
      }
    };

    setLoading(true);

    try{
      const response = await axios(options);
      const data = response.data;

      setLoading(false);
      setShow(true);
      console.log(data);
      setVideoName(data.title);
      setVideoDuration(data.duration);
      setVideoImage(data.thumbnail);

      /*
      Unfortunatelly, API provides different entries with different videos (for example in one video mp3 format can be accessed by data.medias[0].url, while in another one by data.medias[5].url), so I couldn't apply one solution for each video quality and need to come up with some resolution, thus why I created this if statements.
      */
      data.medias.forEach(element => {
        if(element.extension === 'mp3' && element.quality === '128kbps'){
          setLinkMP3(element.url);
        }
        if(element.extension === 'mp4' && element.quality === '144p'){
          setLink144p(element.url);
        }
        if(element.extension === 'mp4' && element.quality === '240p'){
          setLink240p(element.url);
        }
        if(element.extension === 'mp4' && element.quality === '360p'){
          setLink360p(element.url);
        }
        if(element.extension === 'mp4' && element.quality === '480p'){
          setLink480p(element.url);
        }
        if(element.extension === 'mp4' && element.quality === '720p'){
          setLink720p(element.url);
        }
        if(element.extension === 'mp4' && element.quality === '720p60'){
          setLink720p(element.url);
        }
        if(element.extension === 'mp4' && element.quality === '1080p'){
          setLink1080p(element.url);
        }
        if(element.extension === 'mp4' && element.quality === '1080p60'){
          setLink1080p(element.url);
        }
      });

    }catch(error) {
      console.log('error: ', error);
      alert('Something went wrong, please try again.');
    }
  
  }

  const getQuality = (e) => {
    const quality = e.target.value;
    switch(quality){
      case '144p':
        setLink(link144p)
        break;
      case '240p':
        setLink(link240p)
        break;
      case '360p':
        setLink(link360p)
        break;
      case '480p':
        setLink(link480p)
        break;
      case '720p':
        setLink(link720p)
        break;
      case '1080p':
        setLink(link1080p)
        break;
      default:
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>YT <BsYoutube className='icon' /> Downloader</h1>
        <p className='instruction'>Enter Youtube link below and click convert</p>
        <div className="searchbar">
          <input type="text" value={input} onChange={getInput} onClick={clearInput} />
          <button className='convertBtn' onClick={convertLink}>Convert</button>
        </div>
        {loading && <p className='loading'>Loading...</p>}
        {show && (
        <Fragment>
        <p className='info'>{videoName}</p>
        <p className='info'>Duration: {videoDuration}</p>
        <img className='image' src={videoImage} alt="yt thumbnail" />
        <div className="downloadContainer">
          <a download href={linkMP3} className='downloadBtn'>Download MP3</a>
          <select name="quality" defaultValue="144p" onChange={getQuality}>
            {link144p && <option value="144p">144p</option>}
            {link240p && <option value="240p">240p</option>}
            {link360p && <option value="360p">360p</option>}
            {link480p && <option value="480p">480p</option>}
            {link720p && <option value="720p">720p</option>}
            {link1080p && <option value="1080p">1080p</option>}
          </select>
          <a download href={link} className='downloadBtn'>Download MP4</a>
        </div>
        </Fragment>
        )}
      </div>
    </div>
  );
}

export default App;

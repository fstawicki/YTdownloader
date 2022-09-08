import { useState } from 'react';
import axios from "axios";

import './App.css';

function App() {

  const [input, setInput] = useState('');

  const getInput = (e) => {
    setInput(e.target.value);
  }

  const convertLink = () => {
    const options = {
      method: 'GET',
      url: 'https://yt-downloader1.p.rapidapi.com/api',
      params: {
        url: `${input}`,
        key: '5145f7563cd789876e861e2dba4d15763501c84256ae3ac182116233173acaf0'
      },
      headers: {
        'X-RapidAPI-Key': '0e080c7fe2mshbaae96571089130p16a7bbjsn016819b32a15',
        'X-RapidAPI-Host': 'yt-downloader1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div className="App">
      <div className="container">
        <h1>YT Downloader</h1>
        <p>Enter Youtube link below and click convert</p>
        <div className="searchbar">
          <input type="text" value={input} onChange={getInput} />
          <button onClick={convertLink}>Convert</button>
        </div>
      </div>
    </div>
  );
}

export default App;

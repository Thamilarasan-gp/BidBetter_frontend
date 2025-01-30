import React, { useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  const [videoPath, setVideoPath] = useState("/MSDhonimemories.mp4");


  const changeVideo = (path) => {
    setVideoPath(path);
  };

  return (
    <section className="home-con">

      <video id="slider" autoPlay muted loop key={videoPath}  >
        <source id="videoSource" src={videoPath} type="video/mp4" />
      </video>

      <div className="hover-details">
        <h1>IPL AUCTION 2025</h1>
        <h2>GUARDIANS OF THE TEAMS</h2>
        <p><strong>Newly Added</strong></p>
        <p>Wait is over , Now Auction is Yours</p>
        <p>
        For years, a loyal team strategist awaits the true heir to a legendary IPL franchise. The auction frenzy begins as the next star player from the bloodline arrives.
        </p>
        <p>Excitement • Strategy • Rivalry • Thrilling</p>
        <button>  <Link to="/Create-Auction">Go To Live Auction</Link> </button>

      </div>

      <ul className="navigation">
        <li onClick={() => changeVideo("/MSDhonimemories.mp4")}>
          
          <div className="thums">
            <img
              src="https://th.bing.com/th/id/OIP.TkUVgs5tYkMtzzwGi3S-agHaEK?w=318&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Thumbnail 1"
            />
          </div>

        </li>
        <li onClick={() => changeVideo("/cskvsrcb.mp4")}>

          <div className="thums">
            <img
              src="https://th.bing.com/th/id/OIP.9WuFiUWqZoPlQ2OOVvXV2AHaEK?w=296&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Thumbnail 2"
            />

          </div>
        </li>
        <li onClick={() => changeVideo("/Mumba.mp4")}>
          <div className="thums">
            <img
              src="https://th.bing.com/th/id/OIP.Gy1x0Zq0EqTr2Mq-h9Nt4wHaEK?w=321&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Thumbnail 3"
            />
          </div>
        </li>
        <li onClick={() => changeVideo("/RCB.mp4")}>
          <div className="thums">
            <img
              src="https://th.bing.com/th/id/OIP.anWu50qLxEY7LM6ZlTC7_AHaEK?w=288&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Thumbnail 4"
            />
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Home;

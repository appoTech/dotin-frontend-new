import { Component } from "react";
import React from "react";
import { withRouter } from "react-router-dom";
import { getURLandredirect, recordClick } from "../helper/api";
import "../css/splash.css";
import Avatar from '@mui/material/Avatar';
/* import CREATORS from "../assets/file.png"; */
/* import youtube from "../assets/youtube.svg"; */
/* import superprofile from "../assets/superprofile.png"; */
import poster1 from "../assets/poster1.jpeg";
import poster2 from "../assets/poster2.jpeg";
import poster3 from "../assets/poster3.jpeg";
import video1 from "../assets/video1.avif";
import video2 from "../assets/video2.PNG";
import video3 from "../assets/video3.avif";
import video4 from "../assets/video4.avif";
import creatoryt from "../assets/creatoryt.avif";
import { MdOutlineIosShare } from "react-icons/md";
/* import { PiYoutubeLogoThin,PiTwitterLogoThin,PiInstagramLogoThin } from "react-icons/pi"; */
import { FaArrowRight } from "react-icons/fa";
import Carousel from '../components/Carousel';
/* import BrandTray from '../components/BrandTray'; */

import AdComponent from '../components/adsComponent';
import logo from "../assets/logo.avif";
/* import slogo from "../assets/slogo.avif";
import loginskip from "../assets/loginskip.png"; */
/* import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png"; */
import appopeneryt from "../assets/appopeneryt.avif";
import { Link } from 'react-router-dom';
import { FaYoutube } from 'react-icons/fa';
import Float from "../components/floatingButton";

import ExpandableFooter from '../components/ExpandableFooter';
import share from "../assets/boot.avif";
import NewAdComponent from "../components/newAdComponent";
//import splash_adv from "../assets/splash/splash_adv.png";
import mapBg from "../assets/map-bg.jpeg";
import portalImage from "../assets/portal.jpeg";


class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intentvalue: "",
      original_url: "",
      ostype: "", 
      countdown: 7,
      showRedirectText: true,
      redirectCanceled: false,
      showShareOptions: false,
      currentIndex: 0,
      promotes: [
    {
      title: "PROMOTE YOUR SPACE",
      linkUrl: "https://appopener.com/yt/share",
      image: poster2,
    },
    {
      title: "GET BOOSTED ON SOCIAL MEDIA",
      linkUrl: "https://appopener.com/yt/tutorial1",
      image: poster3,
    },
    {
      title: "PROMOTE YOUR PROFILE",
      linkUrl: "https://www.instagram.com/ispawnser/",
      image: poster1,
    },
  ]
    };
    this.handleRedirect = this.handleRedirect.bind(this); 
    this.stopRedirecting = this.stopRedirecting.bind(this);
  }

  handleOverlayClick = () => {
    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;
    recordClick(apptag, shortstring, 'iframe_overlay');
    window.location.assign("https://youtu.be/7OjqvqB0jE4");
  }

  stopRedirecting() {
    clearInterval(this.countdownInterval); // Stop the countdown
    this.setState({
      countdown: "",
      redirectCanceled: true,
      showRedirectText: false,  // Hide the countdown text
    });
  }

   
  
 

  componentDidMount() {
    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;
    getURLandredirect(apptag, shortstring).then((res) => {
      console.log("this is res: ",res);
      this.setState({ intentvalue: res.data.smartUrl.data.app_intend });
      this.setState({ original_url: res.data.smartUrl.data.originalURL });
      this.setState({ ostype: res.data.smartUrl.data.os_type });
      const newPromotes = Array.isArray(
            res?.data?.weeklyPromotes?.data.data
          )
            ? res.data.weeklyPromotes.data.data.reverse()
            : [];
      console.log("New Promotes from API: ", newPromotes);
      console.log(res?.data?.weeklyPromotes.data.data);
      this.setState((prevState) => ({
        promotes: [...newPromotes,...prevState.promotes]
      }));

      let app_intend = this.state.intentvalue;
      let originalURL = this.state.original_url;

      const click_link = document.getElementById("abcd");
      console.log("this is app_intend: ",app_intend);
      if (app_intend === "Desktop" || app_intend === "Mobile") {
        app_intend = originalURL;
        /* console.log(app_intend) */
      }
      let countdownInterval = setInterval(() => {
        this.setState((prevState) => ({
          countdown: prevState.countdown - 1,
        }));

        
        if (this.state.countdown === 0) {
          clearInterval(countdownInterval); 
          this.setState({ showRedirectText: false }); 
          this.handleRedirect(); 
        }
      }, 1000); 
    });

    this.promoteInterval = setInterval(() => {
      this.setState((prevState) => ({
        currentIndex: prevState.promotes.length > 0 ? (prevState.currentIndex + 1) % prevState.promotes.length : 0
      }));
    }, 3000);
  }

  componentWillUnmount() {
    if (this.promoteInterval) clearInterval(this.promoteInterval);
  }

  openPopup = (state, type) => {
    console.log("Type is : ", type);
    const link = encodeURIComponent(window.location.href);
    if (type === "promote") {
      this.props.history.push(`/express/promote?link=${link}`);
    } else {
      this.props.history.push(`/express/pager?link=${link}&type=${type}`);
    }
  };
  
  handleRedirect() {
      let app_intend = this.state.intentvalue === "Desktop" || this.state.intentvalue === "Mobile"
        ? this.state.original_url
        : this.state.intentvalue;

      if (!app_intend || app_intend === "undefined") {
          app_intend = this.state.original_url;
      }
  
      if (this.state.ostype === "windows") {
          const click_link = document.getElementById("abcd");
          click_link.setAttribute("href", app_intend);
          click_link.click();
      } 
      else {
          window.location.assign(app_intend);
      }
  }
  handleShare = async () => {
    const shareData = {
      title: "Check out this site!",
      url: window.location.href,
    };
  
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Link shared successfully");
      } catch (error) {
        console.error("Error sharing the link:", error);
      }
    } else {
      this.setState({ showShareOptions: true });
      
    
    }
  }; 
 
  handleCopyLink = async () => {
    const linkToCopy = window.location.href;
  
    // Check if the Clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(linkToCopy);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy the link:", error);
      }
    } else {
      // Fallback for unsupported environments
      const tempInput = document.createElement("input");
      tempInput.value = linkToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand("copy");
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Fallback copy failed:", error);
      }
      document.body.removeChild(tempInput); // Clean up
    }
  };
  renderShareOptions = () => (
    <div className="share-options-modal">
      <div className="">Share</div>
      <div className="flex flex-row">
     <div className="copy-link-container flex ">
        <input
          type="text"
          value={window.location.href}
          readOnly
          className="link-input"
        />
        <button onClick={this.handleCopyLink} className="copy-button flex">
          Copy
        </button>
      </div>
      </div>

     {/*  <div className="share-icons">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            window.location.href
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a
          href={`https://www.reddit.com/submit?url=${encodeURIComponent(
            window.location.href
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Reddit
        </a>
      </div> */}
      <button className="closeBtn" onClick={() => this.setState({ showShareOptions: false })}>
        Close
      </button>
    </div>
  );

  render() {
    const { promotes = [], currentIndex = 0 } = this.state;
    const openPopup = this.openPopup;
    const state = this.state;
    const setCurrentIndex = (index) => this.setState({ currentIndex: index });
    const currentTheme = {
      bg: "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900",
      text: "text-white",
      navbar: "bg-indigo-950/60 border-indigo-500",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-400",
      card: "bg-slate-900/60 border-indigo-600",
      accent: "text-indigo-300",
      shadow: "shadow-indigo-500",
      topNav: "backdrop-blur-lg border-b border-[#9D4EDD] shadow-[0_0_15px_#9D4EDD]/50",
      videoGlow: "shadow-[0_0_25px_#00F5FF]/60",
      iconBorder: "border-white/20",
      promoteBtn: "bg-gray-400 border-gray-600 text-black hover:bg-gray-500",
    };
    const carouselItems = [
      {
        image: video1,
        link: "https://appopener.com/yt/0sjnsz5k8",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "CreatorCosmos",
        description: "Go Beyond Creativity with AppOpener",
      },
      {
        image: appopeneryt,
        link: "https://appopener.com/yt/1ea6xi5pc",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "Creator Cosmos",
        description: "Not an Ordinary URL Shortner - AppOpener.com - Intro",
      },
      {
        image: video4,
        link: "https://appopener.com/ig/mmunty2wp",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "AppOpener",
        description: "The Evolution of Deep Linking",
      },
      // Add more items as needed
    ];
/*     const imageData = [
      {
        link: "https://shop.creatorcosmos.com/",
        imgSrc: CREATORS,
        alt: "Superprofile"
      },
      {
        link: "https://cosmofeed.com/appopener",
        imgSrc: superprofile,
        alt: "Superprofile"
      },
      {
        link: "https://spawnser.com/",
        imgSrc: slogo,
        alt: "Sponsor logo"
      },
      {
        link: "https://admin.loginskip.com/",
        imgSrc: loginskip,
        alt: "Login Skip"
      }
    ]; */
    return (
      <>
    <div className='main-container'>
      <img
        src={mapBg}
        alt=""
        loading="lazy"
        className="splash-bg"
      />
      {/* <div className='header'> */}
        {/* <div className='user-details'> */}
        {/* <Link to="/"> */}
    {/* <Avatar alt="logo" src={logo} sx={{ width: 58, height: 58 }} /> */}
        {/* </Link> */}
          {/* <p className='user-tag'><span className=' pb-1 '>AI</span><span></span></p> */}
        {/* </div> */}
       {/*  <button onClick={this.handleShare}  className="share-button   border border-white text-white bg-white hover:bg-white hover:text-black rounded">
        <img className='share-img ' src={share} alt='Channel Logo' /> 
      </button> */}

        {/* <div className='subscribe-button bg-black ml-2'>
          <button onClick={this.handleShare} className="share-button bg-black   ml-2">
            <img className="share-img" src={share} alt="" />
            
          </button>
        </div> */}
     
      {/* </div> */}
      {/* {this.state.showShareOptions && this.renderShareOptions()} */}

      <div className='hero-section'>
        <div className='latest-link '>
   
          <div className='latest-link-img  '>
            <div className="iframe-container">
              <iframe className="vid"
              /* width="100%"
              height="auto" */
       
       src="https://www.youtube.com/embed/7OjqvqB0jE4?autoplay=1&loop=1&mute=1"
       title="HOLI TRIP | When Life gives you LEMONS, 'Kaat ke Chaat Lo' | Shiv Trance Holi Vlog"
       frameBorder="0"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       referrerPolicy="strict-origin-when-cross-origin"
       allowFullScreen
     ></iframe>
              <div className="iframe-overlay" onClick={this.handleOverlayClick}></div>
            </div>
           {/*  <img src={video1} alt="Video thumbnail"></img> */}
{/*             <div className="glass-effect">
  <p className='text-sm font-bold text-white'>AppOpener</p>
</div> */}
            {/* <button>
              <MdOutlineIosShare color='white' size='11px'/>
            </button>  */}

<div className='video-info flex'>
    <img className='channel-logo' src={creatoryt} alt='Channel Logo' />
    <div className='video-details'>
      <h4 className='video-title'>Monetise and Analyse with AppOpener</h4>
      <p className='channel-name'>CreatorCosmos</p>
    </div>
  </div>


          </div>
          <a id="abcd" target="_self">
          
          </a>  
       
        {/*   <div className='videoLinks flex-row    pb-3'>
            <div className='flex'>
            <p><span className='creator-name flex '>AppOpener</span> </p>
             
            </div>
              <div className='flex gap-2 mr-3'>
              <a href="https://shop.creatorcosmos.com/" target="_blank" rel="noopener noreferrer">
              <img
          src={twitter}
          alt=" "
          className="  flex "
          style={{ width: '30px', height: '30px' }}
        />
        </a>
        <a href="https://appopener.ai/ig/jeapwpumh" target="_blank" rel="noopener noreferrer">
        <img
          src={instagram}
          alt=" "
          className="  flex mr-2"
          style={{ width: '30px', height: '30px' }}
        />
        </a>
             
            </div>  
          </div> */}
         {/*  <p>"Your path to digital success starts here, with AppOpener"</p> */}
          {this.state.showRedirectText && (
            <div className="countdown-text flex justify-center">
              {``}
            </div>
          )} 
        </div>
        <div className="conti">
        <div className="continueButton stickyButton bg-red-500 text-white">
          {this.state.showRedirectText ? (
            <p className="pt-3">Redirecting in {this.state.countdown} seconds...</p>
          ) : (
            <button onClick={this.handleRedirect} className='flex gap-2 flex-row  '>
            {/*  <PiYoutubeLogoThin  color='red' size='30px'/> */}
{/*             <img
           src={youtube}
           alt=" "
           className=" bg-black  "
           style={{ width: '40px', height: '40px' }}
         /> */}
         <FaYoutube style={{color:'white'}} size="32px"/>
             <div className=' gap-2 pt-1   text-red-500 flex '>
             
             Watch Now
             <FaArrowRight className='flex pt-1'color='white' size='20px'/>
             </div>
           </button>
          )}
          
        </div>

        {/* Cancel Button */}
        {this.state.showRedirectText && (
          <div className="cancel" id="cancel">
            <button
              style={{
                color: "white",
                fontWeight: "600",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              onClick={this.stopRedirecting}
               >
              Cancel
            </button>
          </div>
        )}
       
        
        <div className='ml-2 flex '  >
     

<div  className="mt-4">
        
      </div> 
           
     
      </div>
      </div>

      </div>
      <div
  style={{
    width: "100%",
    maxWidth: "1200px",
    margin: "auto",
    padding: "0 12px",
  }}
>
  {/* HEADER */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "14px",
      flexWrap: "wrap",
      gap: "10px",
    }}
  >
    <button
      onClick={() => openPopup(state, "promote")}
      style={{
        background: "#1b1c5c",
        color: "#ffe066",
        border: "2px solid #facc15",
        borderRadius: "16px",
        padding: "14px 18px",
        fontSize: "24px",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow: "0 0 18px rgba(255,215,0,0.2)",
      }}
    >
      Spawnser the feat ✨ - $11
    </button>
  </div>

  {/* MAIN CARD */}
  <div
    style={{
      background: "#07113d",
      border: "2px solid #4f46e5",
      borderRadius: "28px",
      padding: "20px",
      width: "100%",
    }}
  >
    {/* FEATURED */}
    {promotes.length > 0 && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
  onClick={() => {
    const isLastThree =
      currentIndex >= promotes.length - 3;

    if (isLastThree) {
      openPopup(state, "promote");
    } else {
      window.open(
        promotes[currentIndex]?.linkUrl,
        "_blank"
      );
    }
  }}
          style={{
            width: "100%",
            maxWidth: "800px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "24px",
            textDecoration: "none",
          }}
        >
          <img
            src={promotes[currentIndex].image || video1}
            alt={promotes[currentIndex]?.title}
            style={{
              width: "100%",
              borderRadius: "24px",
              objectFit: "cover",
              maxHeight: "500px",
            }}
          />

          {/* TITLE */}
          <div
            style={{
              position: "absolute",
              bottom: "14px",
              left: "14px",
              background: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "8px 14px",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            {promotes[currentIndex]?.title}
          </div>

          {/* FLOAT ICON */}
          <div
            style={{
              position: "absolute",
              right: "14px",
              bottom: "20px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #d946ef",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: "34px",
                height: "34px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    )}

    {/* PROMOTE BUTTON */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <button
        onClick={() => openPopup(state, "promote")}
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "22px",
          background: "#c9ced6",
          border: "2px solid #6b7280",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            fontSize: "40px",
            fontWeight: "900",
            color: "black",
            lineHeight: 1,
          }}
        >
          +
        </div>

        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "black",
            marginTop: "10px",
          }}
        >
          Promote it 🚀
        </div>
      </button>
    </div>

    {/* CARDS */}
    <div
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        padding: "30px 0 10px",
        marginTop: "10px",
      }}
    >
      {Array.isArray(promotes) &&
        promotes.length > 1 &&
        promotes.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              minWidth: "150px",
              background: "#1b234f",
              borderRadius: "18px",
              overflow: "hidden",
              cursor: "pointer",
              border:
                idx === currentIndex
                  ? "2px solid #facc15"
                  : "2px solid transparent",
              transform:
                idx === currentIndex ? "scale(1.05)" : "scale(1)",
              opacity: idx === currentIndex ? 1 : 0.8,
              transition: "0.3s",
              position: "relative",
            }}
          >
            {/* PRICE */}
            <div
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "rgba(0,0,0,0.7)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "8px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              ₹25
            </div>

            <img
              src={item.image || video1}
              alt={item.title}
              style={{
                width: "100%",
                height: "130px",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                color: "white",
                textAlign: "center",
                padding: "12px",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              {item.title}
            </div>
          </div>
        ))}
    </div>
  </div>
</div>
       {/* <div className='caro-container'>
        <Carousel items={carouselItems}/>
      </div>  */}
      <div className='expand-container'>
        {/* <ExpandableFooter/> */}
      </div>
      {/* <Float/> */}
      {this.state.showShareOptions && this.renderShareOptions()}
    </div>
        <a
  href="https://www.appopener.com/"
  target="_blank"
  rel="noopener noreferrer"
>
  <div className="relative z-10 mb-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
  <img
    src={portalImage}
    alt="AppOpener portal"
    className="h-80 w-full object-cover sm:h-96"
  />
  </div>
  </a>
  </>

    );
  }
}


export default withRouter(Splash);

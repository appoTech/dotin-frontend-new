import { Component } from "react";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getURLandredirect, recordClick } from "../helper/api";
import "../css/splash.css";
import axios from "axios";
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
import PipIframe from "../components/PipIframe";
import ShareTray from "../components/ShareTray";
import banner from "../assets/banner.png";
// import avatarframe from "../assets/avatarframe.png";
import avatarframe from "../assets/frame01.png"
import { getAdHtml } from "../components/AdPresentation";
import ss01 from "../assets/ss01.jpg";
import ss02 from "../assets/ss02.jpg";
import ss03 from "../assets/ss03.jpg";
import ss04 from "../assets/ss04.jpg";
import ss05 from "../assets/ss05.jpg";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/";

const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) {
      resolve(window.Cashfree);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(window.Cashfree);
    script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
    document.head.appendChild(script);
  });
};

const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";
  let videoId = "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    videoId = match[2];
  } else {
    const shortsReg = /\/shorts\/([a-zA-Z0-9_-]{11})/;
    const shortsMatch = url.match(shortsReg);
    if (shortsMatch) {
      videoId = shortsMatch[1];
    }
  }
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&playlist=${videoId}`;
  }
  return url;
};

const RollingCounter = ({ value, duration = 1000 }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    let start = value - 1000;
    const end = value;

    if (start === end) return;

    const incrementTime = Math.floor(duration / (end - start));
    let current = start;

    const timer = setInterval(() => {
      current += 3;
      setCount(current);

      if (current >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span className="font-bold">{count}</span>;
};

 export function GlassBanner() {
  return (
    <div className="relative w-full flex justify-center pt-6 select-none">
      <div className="relative" style={{ perspective: "1200px" }}>
        <div className="pointer-events-none absolute -inset-8 -z-10 opacity-70">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-48 w-48 bg-fuchsia-500/40 blur-3xl" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-48 w-48 bg-cyan-400/40 blur-3xl" />
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-32 w-72 bg-indigo-500/30 blur-3xl" />
        </div>

        <div
          className="relative backdrop-blur-md p-2"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,26,26,0.45) 0%, rgba(0,0,0,0.45) 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -8px 24px rgba(0,0,0,0.55), 0 30px 60px -10px rgba(0,0,0,0.7)",
            transform: "rotateX(6deg)",
            clipPath:
              "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
          }}
        >
          <div
            className="relative w-[320px] sm:w-[560px] h-[160px] sm:h-[280px] overflow-hidden bg-black/60"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            }}
          >
            <a
              href="https://stake.mba/?c=SEHXCte2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={banner}
                alt="AppOpener banner"
                className="w-full h-full object-cover"
              />
            </a>
          </div>

          <div
            className="pointer-events-none absolute inset-x-4 top-0 h-6 opacity-50"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.4), transparent 90%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intentvalue: "",
      original_url: "",
      ostype: "", 
      countdown: 8,
      showRedirectText: true,
      redirectCanceled: false,
      showShareOptions: false,
      currentIndex: 0,
      ytavatar: "",
      visitorcount: 0,
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
  ],
      shareTrayOpen: false,
      spotlightVideos: [],
      currentSpotlightIndex: 0,
      showVipModal: false,
      vipForm: {
        name: "",
        email: "",
        mobile: "",
        ytLink: ""
      },
      vipSubmitting: false,
      vipStep: "form",
      vipOrderId: "",
      vipResult: null,
      showAdOverlay: false,
      adHtml: null,
      showAuditionModal: false,
      auditionForm: { name: "", creatorId: "", email: "", videoLink: "" },
      auditionVideoEmbed: null,
      auditionSubmitting: false,
      auditionDone: false,
      showHowItWorksModal: false
    };
    this.handleRedirect = this.handleRedirect.bind(this); 
    this.stopRedirecting = this.stopRedirecting.bind(this);
  }

  onOpenShareTray = () => {
    this.setState({ shareTrayOpen: true });
  }

  openAuditionModal = () => {
    this.setState({ showAuditionModal: true, auditionDone: false, auditionForm: { name: "", creatorId: "", email: "", videoLink: "" }, auditionVideoEmbed: null });
  };

  closeAuditionModal = () => {
    this.setState({ showAuditionModal: false });
  };

  openHowItWorksModal = () => {
    this.stopRedirecting();
    this.setState({ showHowItWorksModal: true });
  };

  closeHowItWorksModal = () => {
    this.setState({ showHowItWorksModal: false });
  };

  handleAuditionField = (field, value) => {
    this.setState(prev => ({
      auditionForm: { ...prev.auditionForm, [field]: value },
      ...(field === 'videoLink' ? { auditionVideoEmbed: this.resolveVideoEmbed(value) } : {})
    }));
  };

  resolveVideoEmbed = (url) => {
    if (!url) return null;
    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([-\w]{11})/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    // Instagram – can't embed, show link card
    if (url.includes('instagram.com')) return { type: 'link', url };
    // Twitter/X
    if (url.includes('twitter.com') || url.includes('x.com')) return { type: 'link', url };
    // Direct video file
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { type: 'video', url };
    // Fallback: try as generic link
    return { type: 'link', url };
  };

  handleAuditionSubmit = async (e) => {
    e.preventDefault();
    this.setState({ auditionSubmitting: true });
    try {
      await axios.post(`${API_URL}api/audition`, this.state.auditionForm);
    } catch (_) { /* best-effort */ }
    this.setState({ auditionSubmitting: false, auditionDone: true });
  };

  handleOverlayClick = () => {
    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;
    recordClick(apptag, shortstring, 'iframe_overlay');
    
    const { spotlightVideos, currentSpotlightIndex } = this.state;
    if (spotlightVideos && spotlightVideos.length > 0) {
      window.open(spotlightVideos[currentSpotlightIndex].ytvideoLink, "_blank");
    } else {
      window.location.assign("https://www.appopener.com/trending");
    }
  }

  stopRedirecting() {
    clearInterval(this.countdownInterval); // Stop the countdown
    this.setState({
      countdown: "",
      redirectCanceled: true,
      showRedirectText: false,  // Hide the countdown text
    });
  }

   
  
 

  fetchSpotlightVideos = () => {
    return axios.get(`${API_URL}payment/spotlight/active`)
      .then(res => {
        const videos = res.data.videos || [];
        this.setState({ spotlightVideos: videos, currentSpotlightIndex: 0 });
        
        if (this.spotlightRotationInterval) clearInterval(this.spotlightRotationInterval);
        if (videos.length > 1) {
          this.spotlightRotationInterval = setInterval(() => {
            this.setState(prevState => ({
              currentSpotlightIndex: (prevState.currentSpotlightIndex + 1) % videos.length
            }));
          }, 7000);
        }
        return videos;
      })
      .catch(err => {
        console.error("Failed to fetch spotlight videos", err);
        return [];
      });
  };

  componentDidMount() {
    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;
    
    Promise.all([
      getURLandredirect(apptag, shortstring),
      this.fetchSpotlightVideos()
    ]).then(([res, videos]) => {
      console.log("this is res: ",res);
      this.setState({ intentvalue: res.data.smartUrl.data.app_intend });
      this.setState({ original_url: res.data.smartUrl.data.originalURL });
      this.setState({ ostype: res.data.smartUrl.data.os_type });
      this.setState({ visitorcount: res.data.visitorCount || 0 });
      
      const countdownTime = videos.length > 0 ? videos.length * 7 : 8;
      this.setState({ countdown: countdownTime });

      const newPromotes = Array.isArray(
            res?.data?.weeklyPromotes?.data.data
          )
            ? res.data.weeklyPromotes.data.data.reverse()
            : [];
      console.log("New Promotes from API: ", newPromotes);
      this.setState((prevState) => ({
        promotes: [...newPromotes,...prevState.promotes]
      }));
      this.setState({ytavatar: res.data.ytChannelDetails?.data?.avatar || ""})

      let app_intend = this.state.intentvalue;
      let originalURL = this.state.original_url;

      if (app_intend === "Desktop" || app_intend === "Mobile") {
        app_intend = originalURL;
      }
      
      this.countdownInterval = setInterval(() => {
        this.setState((prevState) => {
          if (prevState.countdown <= 1) {
            clearInterval(this.countdownInterval);
            this.handleRedirect();
            return { countdown: 0, showRedirectText: false };
          }
          return { countdown: prevState.countdown - 1 };
        });
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
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.spotlightRotationInterval) clearInterval(this.spotlightRotationInterval);
    if (this.pollTimer) clearTimeout(this.pollTimer);
  }

  openVipModal = () => {
    this.stopRedirecting();
    this.setState({
      showVipModal: true,
      vipStep: "form",
      vipForm: { name: "", email: "", mobile: "", ytLink: "" },
      vipResult: null,
      vipSubmitting: false
    });
  };

  closeVipModal = () => {
    this.setState({ showVipModal: false });
  };

  handleVipChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      vipForm: { ...prevState.vipForm, [name]: value }
    }));
  };

  handleVipSubmit = async (e) => {
    e.preventDefault();
    this.setState({ vipSubmitting: true, vipResult: null });

    const { name, email, mobile, ytLink } = this.state.vipForm;

    try {
      const { data } = await axios.post(`${API_URL}payment/createOrder`, {
        customer_name: name,
        customer_email: email,
        customer_phone: mobile,
        amount: 7000,
        OrderType: "vip_spotlight",
        promotion_data: {
          title: "VIP Spotlight",
          linkUrl: ytLink,
          imageUrl: null,
        },
      });

      if (!data.success || !data.payment_session_id) {
        throw new Error("Failed to create VIP order");
      }

      this.setState({
        vipOrderId: data.order_id,
        vipStep: "paying"
      });

      const Cashfree = await loadCashfreeSDK();
      const cashfree = Cashfree({ mode: "production" });

      cashfree
        .checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_modal",
        })
        .then(() => {
          this.pollVipPaymentStatus(data.order_id);
        });
    } catch (error) {
      console.error("VIP Payment Error:", error);
      this.setState({
        vipStep: "form",
        vipSubmitting: false,
        vipResult: {
          success: false,
          message: error?.response?.data?.error || error.message || "Payment failed",
        }
      });
    }
  };

  pollVipPaymentStatus = (orderIdToPoll) => {
    let pollCount = 0;
    const MAX_POLLS = 15;
    const POLL_INTERVAL = 3000;

    const poll = async () => {
      pollCount++;

      try {
        const { data } = await axios.get(
          `${API_URL}payment/verify/${orderIdToPoll}`
        );

        if (data.order_status === "PAID") {
          this.setState({
            vipStep: "success",
            vipSubmitting: false,
            vipResult: { success: true, message: "VIP Payment successful & Spotlight Video is live! 🎉" }
          });
          this.fetchSpotlightVideos();
          return;
        }

        if (data.order_status === "EXPIRED" || data.order_status === "TERMINATED") {
          this.setState({
            vipStep: "form",
            vipSubmitting: false,
            vipResult: { success: false, message: "Payment failed or expired. Please try again." }
          });
          return;
        }

        if (pollCount < MAX_POLLS) {
          this.pollTimer = setTimeout(poll, POLL_INTERVAL);
        } else {
          this.setState({
            vipStep: "pending",
            vipSubmitting: false
          });
        }
      } catch (error) {
        console.error("Verification poll error:", error);
      }
    };

    poll();
  };

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
    const activeVideo = this.state.spotlightVideos && this.state.spotlightVideos.length > 0
      ? this.state.spotlightVideos[this.state.currentSpotlightIndex]
      : null;
    const navItems = [
      {},
      {},
      { icon: null }
    ];
    const displayLogo = <img src={this.state.ytavatar !== "" ? this.state.ytavatar : logo} alt="logo" referrerPolicy="no-referrer" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />;
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
    <div className="relative min-h-screen w-full overflow-hidden font-nerko">
      {/* <img
        src={mapBg}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover -z-50"
      /> */}
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

      <div className="spotlight-title-container flex justify-center text-center w-full py-1">
        <div className="text-[40px] font-bold text-[#ffc928] [text-shadow:2px_2px_4px_#1e1b4b] [filter:brightness(1.3)_drop-shadow(0_8px_20px_rgba(255,201,40,0.8))_drop-shadow(0_12px_30px_rgba(255,201,40,0.4))] shadow-[0_15px_40px_rgba(255,201,40,0.6),0_25px_60px_rgba(255,201,40,0.3)]"><span className="inline-block -scale-x-100">🔦</span> SPOTLIGHT 🔦</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-6 w-full max-w-[480px] mx-auto px-2 box-border md:max-w-[720px] md:gap-8 -mt-1">
        <div className="flex flex-col justify-center items-center w-full max-w-[480px] relative md:max-w-[720px]">
   
          <div className="relative rounded-xl overflow-hidden block w-full max-w-[480px] md:max-w-[720px]">
            <div className="relative w-full aspect-video rounded-t-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 bg-black">
              <iframe className="w-full h-full block border-none"
                src={
                  this.state.spotlightVideos && this.state.spotlightVideos.length > 0
                    ? getYoutubeEmbedUrl(this.state.spotlightVideos[this.state.currentSpotlightIndex].ytvideoLink)
                    : "https://www.youtube.com/embed/2EKSldfyufo?autoplay=1&loop=1&mute=1"
                }
                title={
                  this.state.spotlightVideos && this.state.spotlightVideos.length > 0
                    ? `Spotlight: ${this.state.spotlightVideos[this.state.currentSpotlightIndex].name}'s Video`
                    : "AppOpener Intro"
                }
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              {this.state.spotlightVideos && this.state.spotlightVideos.length > 0 && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-oswald font-black text-[11px] py-1 px-2.5 rounded shadow-[0_0_10px_rgba(250,204,21,0.6)] pointer-events-none z-[150] tracking-wider">SPOTLIGHT ⚡</div>
              )}
              <div className="absolute inset-0 cursor-pointer z-[100] bg-transparent" onClick={this.handleOverlayClick}></div>
            </div>

            <div className="flex items-center w-full p-1.25 bg-[#232222]">
              <img className="w-[47px] h-[47px] rounded-full mr-[15px] ml-[10px] p-[5px] -mt-[5px] bg-black" src={this.state.ytavatar !== "" ? this.state.ytavatar : logo} alt="Channel Logo" referrerPolicy="no-referrer" />
              <div className="flex flex-col pt-2.5 text-left">
                <h4 className="text-sm font-bold m-0 text-white font-playwrite">
                  {activeVideo ? (activeVideo.title || activeVideo.name) : "Monetise and Analyse with AppOpener"}
                </h4>
                <p className="text-lg text-[#606060] mt-1">
                  {activeVideo ? (activeVideo.channelName || activeVideo.name) : "CreatorCosmos"}
                </p>
              </div>
            </div>

          </div>
          <a id="abcd" target="_self"></a>  
       
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
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-[480px] box-border md:max-w-[720px] -mt-4">
          <div className="w-full bg-[#d72323] h-10 flex flex-row justify-center items-center rounded-none sticky top-0 z-[3] text-white md:h-[52px]">
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
              <div className="gap-2 pt-1 flex text-lg">
                Watch Now
                <FaArrowRight className="flex pt-1" color="white" size="20px"/>
              </div>
            </button>
          )}
        </div>

        {/* Cancel Button */}
        {this.state.showRedirectText && (
          <div className="w-auto flex justify-center items-center mt-2.5" id="cancel">
            <button
              className="text-white font-normal text-[32px] rounded-[5px] bg-black [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)] cursor-pointer py-[5px] px-[25px]"
              onClick={this.stopRedirecting}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex justify-center items-center mt-2 mb-4">
          <button className="inline-flex items-center gap-[7px] py-[10px] pr-[18px] pl-[14px] bg-black/55 backdrop-blur-[10px] border border-white/12 rounded-full text-white font-inter text-[28px] font-semibold tracking-[0.3px] cursor-default select-none animate-viewer-fadein transition-transform duration-200 hover:scale-[1.04]">
            <div className="w-3 h-3 rounded-full bg-[#22c55e] shrink-0 animate-pulse-dot"></div>
            <RollingCounter value={this.state.visitorcount} /> <span className="ml-[1px]">watching</span>
          </button>
        </div>
      </div>
      </div>
    <div
      className="relative -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center mt-2 rounded-full bg-white w-auto cursor-pointer z-[100] transition-all duration-200 hover:bg-[#4338ca] hover:-translate-x-1/2 hover:scale-[1.05]"
    >
      <div 
      className="relative w-28 h-28 flex items-center justify-center"
      onClick={() => this.setState({ shareTrayOpen: true })}
      >
        <img
          src={avatarframe}
          alt=""
          className="absolute top-1 left-1 w-26 h-26 animate-spin-slow"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {displayLogo}
        </div>
      </div>
    </div>

      <div className="w-full max-w-[1200px] mx-auto px-3">
        {/* HEADER */}

        {/* SPOTLIGHT SECTION */}
        <div className="bg-gradient-to-br from-[#090d22] to-[#15103a] border-2 border-[#8b5cf6] rounded-[24px] p-6 mb-3 mx-auto max-w-[1200px] w-full text-center relative overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.25)]">
          <button 
            className="absolute top-4 right-4 bg-white/8 border border-white/15 text-[#a78bfa] w-[38px] h-[38px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#8b5cf6]/25 hover:border-[#8b5cf6] hover:text-white hover:rotate-15 hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(139,92,246,0.4)] z-10 p-0 outline-none" 
            onClick={this.openHowItWorksModal}
            title="How it Works"
            aria-label="How it Works"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-oswald font-extrabold text-base py-1.5 px-4 rounded-[50px] uppercase tracking-[1.5px] shadow-[0_0_15px_rgba(250,204,21,0.4)] mb-3">SPOTLIGHT ZONE ⚡</div>
          <p className="text-[#94a3b8] font-inter text-base max-w-[600px] mx-auto mb-5 leading-relaxed">
            Get your YouTube Video featured in the spotlight! Millions of views & impressions guaranteed.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white border border-[#fbbf24] font-inter font-bold text-lg py-3.5 px-7 rounded-2xl cursor-pointer shadow-[0_4px_15px_rgba(217,119,6,0.3)] hover:shadow-[0_8px_25px_rgba(217,119,6,0.5)] transition-all duration-300 hover:-translate-y-0.75 flex items-center gap-2" onClick={this.openVipModal}>
              👑 VIP Spotlight (₹7,000)
            </button>
            <button className="bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white border border-[#818cf8] font-inter font-bold text-lg py-3.5 px-7 rounded-2xl cursor-pointer shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.5)] transition-all duration-300 hover:-translate-y-0.75 flex items-center gap-2" onClick={this.openAuditionModal}>
              🚀 Audition (Promote it)
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "14px",
            width: "100%",
          }}
        >
          <button
            onClick={() => openPopup(state, "promote")}
            className="bg-[#1b1c5c] text-[#ffe066] border-2 border-yellow-400 rounded-2xl py-2.5 px-4 text-[28px] sm:text-[24px] md:text-[32px] font-bold font-oswald cursor-pointer shadow-[0_0_18px_rgba(255,215,0,0.15)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(255,215,0,0.3)] sm:py-3.5 sm:px-[18px]"
          >
            Spawnser the feat ✨ - $11
          </button>
        </div>

  {/* MAIN CARD */}
  <div className="bg-[#07113d] border-2 border-[#4f46e5] rounded-[28px] p-5 w-full relative">
    
    {/* FEATURED */}
    {promotes.length > 0 && (
      <div className="flex justify-center">
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
          className="w-full max-w-[800px] relative overflow-hidden rounded-[24px] no-underline cursor-pointer"
        >
          <img
            src={promotes[currentIndex].image || video1}
            alt={promotes[currentIndex]?.title}
            className="w-full rounded-[24px] object-cover"
          />

          {/* TITLE */}
          <div className="absolute bottom-3.5 left-3.5 right-[90px] bg-black/75 backdrop-blur-[2px] text-white py-2 px-3.5 rounded-lg font-bold text-xl truncate sm:text-sm sm:py-1.5 sm:px-2.5 sm:bottom-2.5 sm:left-2.5 sm:right-[70px]">
            {promotes[currentIndex]?.title}
          </div>

          {/* FLOAT ICON */}
          <div className="absolute right-3.5 bottom-5 w-[60px] h-[60px] rounded-full bg-black flex items-center justify-center border-2 border-[#d946ef] sm:w-11 sm:h-11 sm:bottom-3 sm:right-3">
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
    <div className="flex justify-center mt-[30px]">
      <button
        onClick={() => openPopup(state, "promote")}
        className="w-full max-w-[500px] rounded-[22px] bg-[#c9ced6] border-2 border-[#6b7280] py-[30px] px-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-[#dbe1e8] sm:py-5 sm:px-3.5"
      >
        <div className="text-[40px] font-black text-black leading-none sm:text-[30px]">+</div>

        <div className="text-2xl font-bold text-black mt-2.5 sm:text-lg sm:mt-1.5">Promote it 🚀</div>
      </button>
    </div>

    {/* CARDS */}
    <div className="flex gap-4 overflow-x-auto py-7 px-0 mt-2.5">
      {Array.isArray(promotes) &&
        promotes.length > 1 &&
        promotes.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`min-w-[150px] bg-[#1b234f] rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 relative border-2 ${
              idx === currentIndex
                ? "border-[#facc15] scale-105 opacity-100"
                : "border-transparent scale-100 opacity-80"
            }`}
          >
            {/* PRICE */}
            <div className="absolute top-2 right-2 bg-black/70 text-white py-1 px-2 rounded-lg text-[14px] font-bold">
              ₹25
            </div>

            <img
              src={item.image || video1}
              alt={item.title}
              className="w-full h-[130px] object-cover block"
            />

            <div className="text-white text-center p-3 font-bold text-[18px] whitespace-nowrap overflow-hidden truncate">
              {item.title}
            </div>
          </div>
          
        ))}
    </div>
  </div>

  {/*STake Banner*/}
   <GlassBanner />
  {/* PORTAL IMAGE CONTAINER */}
  <a
    href="https://www.appopener.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="block mt-8 mb-4 relative z-10"
  >
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <img
        src={portalImage}
        alt="AppOpener portal"
        className="w-full object-cover"
      />
    </div>
  </a>
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
  <ShareTray 
    open={this.state.shareTrayOpen} 
    onOpenChange={(isOpen) => this.setState({ shareTrayOpen: isOpen })} 
    setButtonText={(text) => console.log(text)} 
  />
  <PipIframe src={"https://www.instagram.com/reel/DazPwz_TaFM/"} />

  {this.state.showVipModal && (
    <div className="fixed inset-0 bg-[#020617]/85 backdrop-blur-[8px] flex items-center justify-center z-[9999] p-4">
      <div className="relative bg-[#0f172a] border-2 border-[#f59e0b] rounded-[24px] p-8 w-full max-w-[520px] shadow-[0_0_35px_rgba(245,158,11,0.25)] animate-modal-zoom-in overflow-hidden sm:p-5">
        <button className="absolute top-4 right-4 bg-[#1e293b] border-none text-[#94a3b8] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#334155] hover:text-white" onClick={this.closeVipModal}>✕</button>
        
        {this.state.vipStep === "form" && (
          <form onSubmit={this.handleVipSubmit} className="flex flex-col">
            <h2 className="text-white text-2xl font-bold font-oswald m-0 mb-1.5 text-left">👑 VIP Spotlight Feature</h2>
            <p className="text-[#94a3b8] font-inter text-sm m-0 mb-6 text-left">Feature your video on our splash page for 25 hours.</p>
            
            <div className="flex flex-col mb-4.5 items-start">
              <label className="font-inter text-[#cbd5e1] text-sm font-semibold mb-1.5 text-left w-full block">Your Name <span className="text-red-500 ml-0.5">*</span></label>
              <input
                className="w-full bg-[#1e293b] border border-[#475569] text-white font-inter text-[15px] py-3 px-4 rounded-xl outline-none transition-colors duration-200 focus:border-[#f59e0b]"
                type="text"
                name="name"
                value={this.state.vipForm.name}
                onChange={this.handleVipChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col mb-4.5 items-start">
              <label className="font-inter text-[#cbd5e1] text-sm font-semibold mb-1.5 text-left w-full block">Mobile Number <span className="text-red-500 ml-0.5">*</span></label>
              <input
                className="w-full bg-[#1e293b] border border-[#475569] text-white font-inter text-[15px] py-3 px-4 rounded-xl outline-none transition-colors duration-200 focus:border-[#f59e0b]"
                type="tel"
                name="mobile"
                value={this.state.vipForm.mobile}
                onChange={this.handleVipChange}
                required
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                placeholder="e.g. 9876543210"
              />
            </div>

            <div className="flex flex-col mb-4.5 items-start">
              <label className="font-inter text-[#cbd5e1] text-sm font-semibold mb-1.5 text-left w-full block">Email Address <span className="text-red-500 ml-0.5">*</span></label>
              <input
                className="w-full bg-[#1e293b] border border-[#475569] text-white font-inter text-[15px] py-3 px-4 rounded-xl outline-none transition-colors duration-200 focus:border-[#f59e0b]"
                type="email"
                name="email"
                value={this.state.vipForm.email}
                onChange={this.handleVipChange}
                required
                placeholder="e.g. name@example.com"
              />
            </div>

            <div className="flex flex-col mb-4.5 items-start">
              <label className="font-inter text-[#cbd5e1] text-sm font-semibold mb-1.5 text-left w-full block">YouTube Video URL <span className="text-red-500 ml-0.5">*</span></label>
              <input
                className="w-full bg-[#1e293b] border border-[#475569] text-white font-inter text-[15px] py-3 px-4 rounded-xl outline-none transition-colors duration-200 focus:border-[#f59e0b]"
                type="url"
                name="ytLink"
                value={this.state.vipForm.ytLink}
                onChange={this.handleVipChange}
                required
                placeholder="e.g. https://www.youtube.com/watch?v=..."
              />
            </div>

            <div className="bg-[#1e1b4b] border border-[#312e81] p-4 rounded-xl flex justify-between items-center mb-6 mt-4">
              <span className="font-inter text-[#818cf8] font-semibold text-sm">VIP Spotlight Fee</span>
              <strong className="font-inter text-[#fbbf24] text-xl font-bold">₹7,000</strong>
            </div>

            {this.state.vipResult && !this.state.vipResult.success && (
              <div className="bg-red-500/15 border border-red-500 text-red-300 rounded-xl p-3 mb-4.5 text-sm text-left font-inter">
                {this.state.vipResult.message}
              </div>
            )}

            <button type="submit" disabled={this.state.vipSubmitting} className="w-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white border-none font-inter font-bold text-base py-3.5 rounded-xl cursor-pointer transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed">
              {this.state.vipSubmitting ? "Processing..." : "Pay ₹20,000 & Feature Video"}
            </button>
          </form>
        )}

        {this.state.vipStep === "paying" && (
          <div className="flex flex-col items-center justify-center py-10 px-5 text-center font-inter">
            <div className="w-12 h-12 border-3 border-amber-400/10 rounded-full border-t-amber-400 animate-spin mb-6" />
            <h3 className="text-white text-lg font-bold">Processing VIP Payment...</h3>
            <p className="text-[#94a3b8] text-sm mt-2">Please complete checkout in the payment window.</p>
          </div>
        )}

        {this.state.vipStep === "success" && (
          <div className="flex flex-col items-center justify-center py-10 px-5 text-center font-inter">
            <div className="text-[56px] mb-5 animate-pulse">🎉</div>
            <h3 className="text-white text-lg font-bold">VIP Spotlight Active!</h3>
            <p className="text-[#94a3b8] text-sm mt-2">{this.state.vipResult?.message || "Your video is now featured in the spotlight zone."}</p>
            <button type="button" onClick={this.closeVipModal} className="w-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white border-none font-inter font-bold text-base py-3.5 rounded-xl cursor-pointer transition-opacity duration-200 hover:opacity-90 mt-6">Done</button>
          </div>
        )}

        {this.state.vipStep === "pending" && (
          <div className="flex flex-col items-center justify-center py-10 px-5 text-center font-inter">
            <div className="text-[56px] mb-5 animate-pulse">⏳</div>
            <h3 className="text-white text-lg font-bold">Payment Verification Pending</h3>
            <p className="text-[#94a3b8] text-sm mt-2">Your payment is still being processed. It will be verified shortly.</p>
            <button type="button" onClick={this.closeVipModal} className="w-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white border-none font-inter font-bold text-base py-3.5 rounded-xl cursor-pointer transition-opacity duration-200 hover:opacity-90 mt-6">Close</button>
          </div>
        )}
      </div>
    </div>
  )}

  {this.state.showAdOverlay && (
    <div className="fixed inset-0 w-screen h-screen bg-black/95 flex items-center justify-center z-[10000]">
      <div className="relative w-full h-screen max-w-[800px] bg-black border-l border-r border-[#1a1a1a]">
        <button className="absolute top-4 left-4 z-[10100] bg-white/10 border border-white/20 text-white py-2 px-4 rounded-full cursor-pointer font-mono text-xs transition-all duration-200 hover:bg-red-500/20 hover:border-red-500" onClick={() => {
          this.setState({ showAdOverlay: false, adHtml: null });
        }}>✕ Close</button>
        <iframe
          srcDoc={this.state.adHtml || ''}
          sandbox="allow-scripts allow-same-origin"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="AppOpener Presentation"
        />
      </div>
    </div>
  )}

  {/* ── AUDITION MODAL ── */}
  {this.state.showAuditionModal && (
    <div className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-md flex items-center justify-center z-[1000] p-5 box-border animate-audition-fadein" onClick={(e) => { if (e.target.classList.contains('fixed')) this.closeAuditionModal(); }}>
      <div className="relative bg-gradient-to-br from-[#0f0f1a] to-[#12121f] border border-white/8 rounded-2xl p-7 w-full max-w-[440px] max-h-[92vh] overflow-y-auto shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(139,92,246,0.15)] animate-audition-slidein scrollbar-thin sm:p-4.5 sm:rounded-xl sm:max-h-[95vh]">
        <button className="absolute top-3.5 right-3.5 bg-white/5 border border-white/10 text-white/60 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-red-500/25 hover:text-white" onClick={this.closeAuditionModal}>✕</button>
 
        {this.state.auditionDone ? (
          <div className="flex flex-col items-center text-center py-6 px-4 font-inter">
            <div className="text-5xl mb-4 animate-bounce">🎬</div>
            <h2 className="text-white text-xl font-bold font-oswald">You're in the Queue!</h2>
            <p className="text-slate-400 text-sm mt-2">We've received your audition. We'll review your video and reach out soon. Stay tuned 🚀</p>
            <button className="w-full bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white border-none rounded-xl py-3.25 px-3.5 text-[15px] font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02] sm:py-2.75 sm:text-sm sm:rounded-lg mt-6" onClick={this.closeAuditionModal}>Close</button>
          </div>
        ) : (
          <>
            <div className="mb-5.5 text-left">
              <span className="inline-block bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white text-[10px] font-bold tracking-[2px] uppercase py-1 px-3 rounded-full mb-3">🎬 AUDITION</span>
              <h2 className="text-white text-2xl font-bold font-oswald m-0 mb-1.5 leading-snug">Apply for Spotlight</h2>
              <p className="text-white/45 font-inter text-xs m-0 leading-normal">Submit your video link to get featured in front of millions</p>
            </div>
 
            <form className="flex flex-col gap-4 text-left" onSubmit={this.handleAuditionSubmit}>
              <div className="flex flex-col items-start w-full">
                <label className="text-[11px] font-semibold text-white/55 tracking-wider uppercase mb-1.5 block text-left font-inter w-full">Full Name</label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-[11px] px-3.5 text-white font-inter text-sm outline-none transition-all duration-200 focus:border-[#7c3aed] focus:bg-[#7c3aed]/8"
                  type="text"
                  placeholder="Your name"
                  value={this.state.auditionForm.name}
                  onChange={e => this.handleAuditionField('name', e.target.value)}
                  required
                />
              </div>
 
              <div className="flex flex-col items-start w-full">
                <label className="text-[11px] font-semibold text-white/55 tracking-wider uppercase mb-1.5 block text-left font-inter w-full">Creator ID / Handle</label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-[11px] px-3.5 text-white font-inter text-sm outline-none transition-all duration-200 focus:border-[#7c3aed] focus:bg-[#7c3aed]/8"
                  type="text"
                  placeholder="@yourchannel or creator ID"
                  value={this.state.auditionForm.creatorId}
                  onChange={e => this.handleAuditionField('creatorId', e.target.value)}
                  required
                />
              </div>
 
              <div className="flex flex-col items-start w-full">
                <label className="text-[11px] font-semibold text-white/55 tracking-wider uppercase mb-1.5 block text-left font-inter w-full">Email</label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-[11px] px-3.5 text-white font-inter text-sm outline-none transition-all duration-200 focus:border-[#7c3aed] focus:bg-[#7c3aed]/8"
                  type="email"
                  placeholder="you@email.com"
                  value={this.state.auditionForm.email}
                  onChange={e => this.handleAuditionField('email', e.target.value)}
                  required
                />
              </div>
 
              <div className="flex flex-col items-start w-full">
                <label className="text-[11px] font-semibold text-white/55 tracking-wider uppercase mb-1.5 block text-left font-inter w-full">Video Link</label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-[11px] px-3.5 text-white font-inter text-sm outline-none transition-all duration-200 focus:border-[#7c3aed] focus:bg-[#7c3aed]/8"
                  type="url"
                  placeholder="Paste YouTube / Instagram / video URL"
                  value={this.state.auditionForm.videoLink}
                  onChange={e => this.handleAuditionField('videoLink', e.target.value)}
                />
 
                {/* ── VIDEO PREVIEW ── */}
                {this.state.auditionVideoEmbed && (
                  <div className="w-full mt-3 rounded-lg overflow-hidden border border-white/8 bg-[#0a0a14] aspect-video flex items-center justify-center animate-audition-fadein">
                    {typeof this.state.auditionVideoEmbed === 'string' ? (
                      <iframe
                        src={this.state.auditionVideoEmbed}
                        title="Video Preview"
                        allowFullScreen
                        allow="autoplay; encrypted-media"
                        className="w-full h-full block border-none"
                      />
                    ) : this.state.auditionVideoEmbed.type === 'video' ? (
                      <video
                        src={this.state.auditionVideoEmbed.url}
                        controls
                        className="w-full h-full block border-none"
                      />
                    ) : (
                      <a
                        href={this.state.auditionVideoEmbed.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-[10px] p-3 bg-[#0a0a14] hover:bg-[#7c3aed]/10 rounded-lg text-xs text-[#a78bfa] no-underline truncate w-full justify-between transition-colors duration-200 font-inter"
                      >
                        <span>🔗</span>
                        <span className="truncate flex-1 text-left pl-1 text-white/55">{this.state.auditionVideoEmbed.url}</span>
                        <span className="text-[#7c3aed] text-base flex-shrink-0">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
 
              <button
                type="submit"
                className="w-full bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white border-none rounded-xl py-3.25 px-3.5 text-[15px] font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2 font-inter"
                disabled={this.state.auditionSubmitting}
              >
                {this.state.auditionSubmitting ? 'Submitting…' : '🚀 Submit Audition'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )}

  {this.state.showHowItWorksModal && (
    <div className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-md flex items-center justify-center z-[1000] p-5 box-border animate-audition-fadein" onClick={(e) => { if (e.target.classList.contains('fixed')) this.closeHowItWorksModal(); }}>
      <div className="relative bg-[#0f172a] border-2 border-[#8b5cf6] rounded-[24px] p-8 w-full max-w-[600px] max-h-[85vh] overflow-y-auto shadow-[0_0_35px_rgba(139,92,246,0.3)] animate-modal-zoom-in scrollbar-thin scrollbar-track-[#090d22] scrollbar-thumb-[#8b5cf6] sm:py-6 sm:px-4 sm:rounded-2xl sm:max-h-[95vh]">
        <button className="absolute top-4 right-4 bg-white/5 border border-white/10 text-white/60 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-red-500/20 hover:text-white" onClick={this.closeHowItWorksModal}>✕</button>
        <h2 className="text-white text-2xl font-bold font-oswald m-0 mb-2 text-left">⚡ How Spotlight Works</h2>
        <p className="text-[#94a3b8] font-inter text-sm m-0 mb-7 text-left leading-normal">Feature your video on our high-traffic splash page.</p>
        
        <div className="flex flex-col gap-5 text-left mb-8">
          <div className="flex gap-4 items-start bg-white/2 border border-white/5 p-4 rounded-2xl transition-all duration-200 hover:bg-white/4 hover:border-[#8b5cf6]/25 hover:translate-x-1">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] text-white flex items-center justify-center font-bold text-[15px] shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.4)]">1</span>
            <div>
              <h3 className="text-white font-inter text-base font-semibold m-0 mb-1">Choose Your Spotlight Option</h3>
              <p className="text-[#94a3b8] font-inter text-[13.5px] leading-normal m-0">Select <strong>👑 VIP Spotlight</strong> for guaranteed instant featuring for 25 hours, or apply via <strong>🚀 Audition</strong> to enter the review queue.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-white/2 border border-white/5 p-4 rounded-2xl transition-all duration-200 hover:bg-white/4 hover:border-[#8b5cf6]/25 hover:translate-x-1">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] text-white flex items-center justify-center font-bold text-[15px] shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.4)]">2</span>
            <div>
              <h3 className="text-white font-inter text-base font-semibold m-0 mb-1">Provide Your Details</h3>
              <p className="text-[#94a3b8] font-inter text-[13.5px] leading-normal m-0">Enter your name, mobile number, email address, and your YouTube video URL link.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-white/2 border border-white/5 p-4 rounded-2xl transition-all duration-200 hover:bg-white/4 hover:border-[#8b5cf6]/25 hover:translate-x-1">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] text-white flex items-center justify-center font-bold text-[15px] shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.4)]">3</span>
            <div>
              <h3 className="text-white font-inter text-base font-semibold m-0 mb-1">Feature Goes Live</h3>
              <p className="text-[#94a3b8] font-inter text-[13.5px] leading-normal m-0">For VIP, complete the checkout. For Audition, wait for review. Once verified, your video goes live instantly at the top of our page!</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7 text-left">
          <h3 className="font-oswald text-white text-[22px] font-bold m-0 mb-2">📈 Proof of Results</h3>
          <p className="font-inter text-[#94a3b8] text-sm m-0 mb-5 leading-normal">Here are some performance screenshots showing views and impressions generated via Spotlight:</p>
          <div className="flex flex-col gap-4">
            <div className="bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]">
              <img src={ss01} alt="Campaign Stats 1" className="w-full h-auto block object-contain" loading="lazy" />
            </div>
            <div className="bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]">
              <img src={ss02} alt="Campaign Stats 2" className="w-full h-auto block object-contain" loading="lazy" />
            </div>
            <div className="bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]">
              <img src={ss03} alt="Campaign Stats 3" className="w-full h-auto block object-contain" loading="lazy" />
            </div>
            <div className="bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]">
              <img src={ss04} alt="Campaign Stats 4" className="w-full h-auto block object-contain" loading="lazy" />
            </div>
            <div className="bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]">
              <img src={ss05} alt="Campaign Stats 5" className="w-full h-auto block object-contain" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  </>

    );
  }
}


export default withRouter(Splash);


import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ButtonMUI from "@mui/material/Button";
import { getClickStats } from "../../helper/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faGlobeEurope, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FaCopy, FaGlobe, FaGlobeAsia, FaInstagram,FaRegCopy,FaYoutube } from 'react-icons/fa';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { faYoutube,faGoogle,faYahoo,faTwitter } from "@fortawesome/free-brands-svg-icons";
import Moment from 'react-moment';
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../css/dash_home.css";



let table_data = [];

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};



export const PageTrafficTable = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShowStats = (id) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const handleCloseStats = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };
 
  table_data = props.data;
  table_data = table_data.map((item, index) => ({index, ...item}));
  //console.log("hey");
  console.log(table_data);

  const youtube_thumbnail = (YoutubeURL)=>{
    const urlObject = new URL(YoutubeURL);
  
    let thumbnail_url;

    if(urlObject.hostname === "youtu.be"){
     
      let youtu_be_split = YoutubeURL.split('.');
      youtu_be_split = youtu_be_split[1].split('/');
      thumbnail_url = `https://img.youtube.com/vi/${youtu_be_split[1]}/0.jpg`;
    }
    if(urlObject.hostname === "www.youtube.com"){
     
    //https://img.youtube.com/vi/r5iFrxi9-hY/0.jpg
     let youtube_url_split = YoutubeURL.split('=');
     thumbnail_url = `https://img.youtube.com/vi/${youtube_url_split[1]}/0.jpg`;

    }

   
  
     
  
    return (
      <img class="yt_thumnbnail" src={thumbnail_url} width="50px"></img>
    )
    

  }


  const TableRow = (props) => {
    const { index,click_count,created_at,id,originalURL,tag } = props;
    

    return (
      <tr>
        <td >
          {index+1}
        </td>
       
        <td style={{fontSize:"13px"}}>{youtube_thumbnail(originalURL)}
          <span title={originalURL} style={{marginLeft:"5px",cursor:"pointer"}}>{(originalURL.length > 60)? `${originalURL.substring(0, 50)} ...`: originalURL}</span></td>
        <td className="fw-bold">
        <CopyToClipboard text={
          
            (tag === "Youtube")?`https://appopener.com/yt/${id}`: 
            (tag==="Instagram")?`https://appopener.com/ig/${id}`:
            (tag==="Other")?`https://appopener.com/web/${id}`:""
          }>
            <a title="copy link"><FaRegCopy size="18px" style={{color:"GrayText"}}/></a>
          </CopyToClipboard>   
          <a style={{textDecoration:"none", color:"#3366BB",marginLeft:"5px"}} href=
          {
          (tag === "Youtube")?`https://appopener.com/yt/${id}`: 
          (tag==="Instagram")?`https://appopener.com/ig/${id}`:
          (tag==="Other")?`https://appopener.com/web/${id}`:""
        }
          target="_blank">
            {
          (tag === "Youtube")?`https://appopener.com/yt/${id}`: 
          (tag==="Instagram")?`https://appopener.com/ig/${id}`:
          (tag==="Other")?`https://appopener.com/web/${id}`:""
          }
          </a>
         
         
        </td>
       
        <td> {(tag==="Youtube")? <FaYoutube size="24px" style={{"color":"red"}}/>:
             (tag==="Instagram")?<FaInstagram size="24px" style={{"color":"brown"}}/>:
             (tag==="Other")?<FaGlobeAsia size="24px" style={{"color":"#3588fc"}}/>:""
             }</td>
        <td>
          <span 
            onClick={() => handleShowStats(id)} 
            style={{ 
              cursor: "pointer", 
              color: "#3366BB", 
              textDecoration: "underline",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center"
            }}
            title="Click to view analytics details"
          >
            {click_count}
            <FontAwesomeIcon icon={faEye} size="xs" style={{ marginLeft: "6px", opacity: 0.8 }} />
          </span>
        </td>
       
        <td><Moment format="DD/MM/YYYY">{created_at}</Moment></td>

        
       
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0 text-break">Original URL</th>
              <th className="border-0">Short URL</th>
              
              <th className="border-0">Platform</th>
              <th className="border-0">Clicks</th>
              <th className="border-0">Created on</th>
             
            </tr>
          </thead>
          <tbody>
            {table_data.map(pt => <TableRow {...pt} />)}
          </tbody>
        </Table>
      </Card.Body>
      <ClickStatsDialog open={dialogOpen} handleClose={handleCloseStats} shortUrl={selectedId} />
    </Card>
  );
};

const ClickStatsDialog = ({ open, handleClose, shortUrl }) => {
  const [stats, setStats] = useState({
    clicks1Day: 0,
    clicks2Days: 0,
    clicks3Days: 0,
    clicksLastWeek: 0,
    clicksLastMonth: 0,
    totalClicks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && shortUrl) {
      setLoading(true);
      getClickStats(shortUrl).then((data) => {
        if (data) {
          setStats(data);
        }
        setLoading(false);
      });
    } else if (!open) {
      setStats({
        clicks1Day: 0,
        clicks2Days: 0,
        clicks3Days: 0,
        clicksLastWeek: 0,
        clicksLastMonth: 0,
        totalClicks: 0
      });
    }
  }, [open, shortUrl]);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        style: {
          background: "radial-gradient(circle at -4% -12.9%, rgb(30, 33, 48) 0.3%, rgb(15, 17, 26) 90.2%)",
          color: "white",
          borderRadius: "20px",
          padding: "10px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }
      }}
    >
      <DialogTitle 
        style={{ 
          fontFamily: "'Outfit', 'Montserrat', sans-serif", 
          fontWeight: 700, 
          fontSize: "22px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "15px",
          textAlign: "center",
          background: "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Click Analytics Stats
      </DialogTitle>
      <DialogContent style={{ marginTop: "20px" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "180px", flexDirection: "column", gap: "15px" }}>
            <div className="spinner-border text-info" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p style={{ color: "#aaa", fontSize: "14px" }}>Fetching click metrics...</p>
          </div>
        ) : (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              
              <div style={{ background: "rgba(255, 255, 255, 0.05)", borderRadius: "12px", padding: "12px", textAlign: "center", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <p style={{ color: "#8ab4f8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>1 Day</p>
                <h3 style={{ fontSize: "28px", fontWeight: "800", margin: "5px 0 0", color: "#8ab4f8" }}>{stats.clicks1Day}</h3>
              </div>
              
              <div style={{ background: "rgba(255, 255, 255, 0.05)", borderRadius: "12px", padding: "12px", textAlign: "center", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <p style={{ color: "#c58af9", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>2 Days</p>
                <h3 style={{ fontSize: "28px", fontWeight: "800", margin: "5px 0 0", color: "#c58af9" }}>{stats.clicks2Days}</h3>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", borderRadius: "12px", padding: "12px", textAlign: "center", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <p style={{ color: "#ff8a80", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>3 Days</p>
                <h3 style={{ fontSize: "28px", fontWeight: "800", margin: "5px 0 0", color: "#ff8a80" }}>{stats.clicks3Days}</h3>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", borderRadius: "12px", padding: "12px", textAlign: "center", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <p style={{ color: "#ffb74d", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>1 Week</p>
                <h3 style={{ fontSize: "28px", fontWeight: "800", margin: "5px 0 0", color: "#ffb74d" }}>{stats.clicksLastWeek}</h3>
              </div>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.05)", borderRadius: "12px", padding: "12px", textAlign: "center", border: "1px solid rgba(255, 255, 255, 0.05)", marginTop: "12px" }}>
              <p style={{ color: "#81c784", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>1 Month</p>
              <h3 style={{ fontSize: "28px", fontWeight: "800", margin: "5px 0 0", color: "#81c784" }}>{stats.clicksLastMonth}</h3>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", padding: "10px 5px 0", borderTop: "1px solid rgba(255, 255, 255, 0.05)", fontSize: "12px", color: "#888" }}>
              <span>Link ID: <strong style={{ color: "#ddd" }}>{shortUrl}</strong></span>
              <span>Total Clicks: <strong style={{ color: "#81c784" }}>{stats.totalClicks}</strong></span>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", marginTop: "10px", padding: "10px 15px" }}>
        <ButtonMUI 
          onClick={handleClose} 
          style={{ 
            color: "white", 
            border: "1px solid rgba(255, 255, 255, 0.2)", 
            borderRadius: "8px", 
            padding: "5px 12px",
            textTransform: "none",
            fontSize: "13px"
          }}
        >
          Close
        </ButtonMUI>
      </DialogActions>
    </Dialog>
  );
};

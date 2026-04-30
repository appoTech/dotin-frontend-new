import axios from "axios";
import InApp from 'detect-inapp';
let api_url =  "https://appopener-backend-1klr.onrender.com/";  //process.env.REACT_APP_opnr_api_url; 

export async function getURLandredirect(tag,shorturl){
    //check for USERAGENT Values 
    const useragent = navigator.userAgent || navigator.vendor || window.opera;
    const inapp = new InApp(useragent);
    const value = [`${useragent}`];
        let device = inapp.device;
        let browser = inapp.browser;
        let os = getMobileOperatingSystem();
        let desktop = inapp.isDesktop;
        let mobile = inapp.isMobile;

          const devicetype = (desktop) ? "Desktop" : (mobile) ? "Mobile" : "none";
          const ostype = os;
          const BrowserType = browser;

    try {
        let res = await axios({
             url: api_url+"goto/"+tag+"/"+shorturl,
             method: 'post',
             headers: {
                 'Content-Type': 'application/json',
             },
             data:{
                "DeviceType": devicetype,
                "OsType": ostype,
                "BrowserType": BrowserType
             }
         })
         if(res.status == 200){
             // test for status you want, etc
             console.log(res);
             console.log(res.data);
             
             return res;
         }    
         // Don't forget to return something   
         //return res;
     }
     catch (err) {
         console.error(err);
     }
    
}

export async function generateOpenShortLink(tag,original_link){
    console.log(tag);
    console.log(original_link);
    try {
        let res = await axios({
             url: api_url+"createOpenURL",
             method: 'post',
             headers: {
                'Access-Control-Allow-Origin' : '*',
                 'Content-Type': 'application/json',
                 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
             },
             data:{
                "link": original_link,
                "apptype": tag
                
             }
         })
         if(res.status == 200){
             // test for status you want, etc
             console.log(res);
             console.log(res.data);
             
             return res;
         }    
         // Don't forget to return something   
         //return res;
     }
     catch (err) {
         console.error(err);
     }
}

export async function generateUserLink(tag,original_link,Auth_token){
    console.log(tag);
    console.log(original_link);
    try {
        let res = await axios({
             url: api_url+"createUserURL",
             method: 'post',
             headers: {
                 'Content-Type': 'application/json',
             },
             data:{
                "link": original_link,
                "apptype": tag,
                "authtoken":Auth_token
                
             }
         })
         if(res.status == 200){
             // test for status you want, etc
             console.log(res);
             console.log(res.data);
             
             return res;
         }
         else if(res.status == 401){
             return "Invalid Token";

         }    
         // Don't forget to return something   
         //return res;
     }
     catch (err) {
         console.error(err);
     }
}

//check user exist 
export async function checkIfUserExist(name,email,user_id){
   
    try {
        let res = await axios({
             url: api_url+"checkUserExist",
             method: 'post',
             headers: {
                 'Content-Type': 'application/json',
             },
             data:{
                "name": name,
                "email": email,
                "userid":user_id
                
             }
         })
         if(res.status == 200){
             // test for status you want, etc
             console.log(res);
             console.log(res.data);
             
             return res;
         }    
         // Don't forget to return something   
         //return res;
     }
     catch (err) {
         console.error(err);
     }
}

export async function getUserDashboard(Auth_token){
   
    try {
        let res = await axios({
             url: api_url+"userdata",
             method: 'post',
             headers: {
                 'Content-Type': 'application/json',
             },
             data:{
                "authtoken":Auth_token
                
             }
         })
         if(res.status == 200){
             // test for status you want, etc
            // console.log(res);
            // console.log(res.data);
             
             return res;
         }
         else if(res.status == 401){
             return "Invalid Token";

         }    
         // Don't forget to return something   
         //return res;
     }
     catch (err) {
         console.error(err);
     }
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "other";
}

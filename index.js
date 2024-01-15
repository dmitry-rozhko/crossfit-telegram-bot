require("dotenv").config();
const server = require("./httpServer");
const getCurrentDate = require("./dateFunction");
const parsePage = require("./pageParser");

const data = getCurrentDate();
const url = `https://www.crossfitinvictus.com/wod/${data}-performance/`;

server.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000/");
});

function runAtSpecificTimeOfDay(hour, minutes, func) {
    const twentyFourHours = 86400000;
    const now = new Date();
    let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
    if (eta_ms < 0) {
     eta_ms += twentyFourHours;
    }
    setTimeout(function() {
     //run once
     func();
     // run every 24 hours from now on
     setInterval(func, twentyFourHours);
    }, eta_ms);
   }
   

// runAtSpecificTimeOfDay(11, 55, () => {
  parsePage(url);
// });

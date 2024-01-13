require('dotenv').config();
const server = require("./httpServer");
const getCurrentDate = require("./dateFunction");
const parsePage = require("./pageParser");

const data = getCurrentDate();
const url = `https://www.crossfitinvictus.com/wod/${data}-performance/`;

server.listen(3000, "127.0.0.1", () => {
 console.log("Server running at http://127.0.0.1:3000/");
});

parsePage(url);

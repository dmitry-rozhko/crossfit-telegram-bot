const http = require("http");
const axios = require("axios");
const cheerio = require("cheerio");
const TelegramBot = require("node-telegram-bot-api");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000/");
});

const token = "6733273840:AAG9RMrUdz5Fv5TRWgw5FCsHInnnYOwnRzs";
const bot = new TelegramBot(token, { polling: true });
const forwardChatId = "@crossfit_berserk";

function getCurrentDate() {
  const date = new Date();
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]}-${day - 1}-${year}`;
}

const data = getCurrentDate();
const url = `https://www.crossfitinvictus.com/wod/${data}-performance/`;
async function parsePage(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const entryContent = $(".entry-content").html();

  const message = `${entryContent}`;

  const format = message
    .replace(/<\/?p>/g, "")
    .replace(/<\/?br>/g, "\n")
    .replace(/<\/?span>/g, "")
    .replace(/<\/?h1>/g, "")
    .replace(/<\/?h2>/g, "")
    .replace(/<\/?h3>/g, "")
    .replace(/<\/?ul>/g, "")
    .replace(/<\/?li>/g, "");
  bot.sendMessage(forwardChatId, format, { parse_mode: "HTML" });
  console.log(format);
}

parsePage(url);

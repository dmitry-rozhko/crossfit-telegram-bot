const axios = require("axios");
const cheerio = require("cheerio");
const bot = require("./telegramBot");

const forwardChatId = process.env.FORWARD_CHAT_ID;

async function parsePage(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const entryContent = $(".entry-content").html();

  const message = `${entryContent}`;

  const format = message
    .replace(/<strong>/g, "#wod <strong>")
    .replace(/<\/?p>/g, "")
    .replace(/<\/?br>/g, "\n")
    .replace(/<\/?span>/g, "")
    .replace(/<\/?h1>/g, "")
    .replace(/<\/?h2>/g, "")
    .replace(/<\/?h3>/g, "")
    .replace(/<\/?ul>/g, "")
    .replace(/<\/?li>/g, "");

  bot.sendMessage(forwardChatId, format, { parse_mode: "HTML" });
}

module.exports = parsePage;

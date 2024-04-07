const axios = require("axios");
const express = require("express");
const app = express();
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const ID_CHAT = process.env.ID_CHAT;
const PORT = process.env.PORT || 8081;
const getGeo = async () => {
  const data = await axios.get("https://get.geojs.io/v1/ip/geo.json");
  return data.data;
};
const pushData = async () => {
  try {
    const response = await getGeo();
    await axios.post(`https://api.telegram.org/bot${API_KEY}/sendMessage`, {
      chat_id: ID_CHAT,
      text: JSON.stringify(response),
    });
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
};
app.get("/", async (req, res) => {
  try {
    await pushData();
    res.send("ok");
  } catch (error) {
    res.send("fail data");
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log("app is running");
});

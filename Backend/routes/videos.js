const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  const storageZone = process.env.BUNNY_STORAGE_ZONE;
  const apiKey = process.env.BUNNY_API_KEY;

  const bunnyUrl = `https://ny.storage.bunnycdn.com/${storageZone}/`;


  try {
    const response = await axios.get(bunnyUrl, {
      headers: {
        AccessKey: apiKey
      }
    });

    const videos = response.data
      .filter((file) => file.ObjectName.endsWith(".mp4"))
      .map((file) => ({
        title: file.ObjectName.replace(".mp4", ""),
        filename: file.ObjectName,
        thumbnail: `https://personalv.b-cdn.net/thumbs/${file.ObjectName.replace(".mp4", ".jpg")}`,
        url: `https://personalv.b-cdn.net/${file.ObjectName}`
      }));

    res.json(videos);
  } catch (error) {
    console.error("Bunny API error:", error.response?.status, error.response?.data);
    res.status(500).json({ error: "Unable to fetch video list" });
  }
});


module.exports = router;

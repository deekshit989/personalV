const express = require("express");
const cors = require("cors"); 
const app = express();
app.use(cors());  
const videosRoute = require("./routes/videos");

app.use("/videos", videosRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

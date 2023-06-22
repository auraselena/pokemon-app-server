const express = require("express");
const app = express();
const port = 7000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Pokemon App API");
});

app.listen(port, (error) => {
  if (error) {
    console.error();
  } else {
    console.log(`API is running on port ${port}`);
  }
});

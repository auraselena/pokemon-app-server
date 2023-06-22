const express = require("express");
const app = express();
const port = 7000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Pokemon App API");
});

const { pokemonRouter } = require("./src/router/index");
app.use("/pokemon", pokemonRouter)

app.listen(port, (error) => {
  if (error) {
    console.error();
  } else {
    console.log(`API is running on port ${port}`);
  }
});

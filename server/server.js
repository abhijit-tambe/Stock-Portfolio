const express = require("express");

// const bodyParser = require("body-parser");
const api = require("./routes/api");
const app = express();
// app.use(bodyParser);
const port = 5000;
app.use(express.json());

app.use("/api", api);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});

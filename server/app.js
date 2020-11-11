const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
const connectDB = require("./database/index");
dotenv.config({ path: "./config/config.env" });
const routes = require('./routes/index');
connectDB();

// initialize app

const app = express();
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// logging if in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 8000;

app.use('/api',routes);

app.listen(PORT, () => {
  console.log(`server is running in ${process.env.NODE_ENV} on port : ${PORT}`);
});

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors');
const connectDb = require("./database/index");
const routes = require('./routes/index');

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
connectDb();



app.use('/api',routes);

app.listen(PORT, () => {
  console.log(`server is running in ${process.env.NODE_ENV} on port : ${PORT}`);
});

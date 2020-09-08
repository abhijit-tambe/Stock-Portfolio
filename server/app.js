const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const dashboardRoute = require("./routes/dashboard");
const portfolioRoute = require("./routes/portfolio");
connectDB();

// initialize app
const app = express();
// app.use(bodyParser.json());
app.use(express.json());
// logging if in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 8000;

app.use("/", indexRoute);
app.use("/api/user", userRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/portfolio", portfolioRoute);

app.listen(PORT, () => {
  console.log(`server is running in ${process.env.NODE_ENV} on port : ${PORT}`);
});

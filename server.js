const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./database/connection");
const { SERVER_PORT } = require("./var.js");
const upload = require("express-fileupload");

dotEnv.config();

const app = express();

// Database Connectivity
dbConnection();

// Cors Middleware
app.use(cors());

// Payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
const fs = require("fs");

app.get("/uploads/:name", (req, res) => {
  try {
    const path = "./uploads/" + req.params.name;
    if (fs.existsSync(path)) {
      fs.createReadStream(path).pipe(res);
    } else {
      return res.send({
        status: 400,
        message: "file not found.",
      });
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/statistics", require("./routes/statisticsRoutes"));
app.use("/api/v1/job", require("./routes/jobRoutes"));
app.use("/api/v1/settings", require("./routes/settingsRoutes"));
app.use("/api/v1/contact", require("./routes/contactRoutes"));
app.use("/api/v1/comment", require("./routes/commentRoutes"));
//
app.use("/api/v1/slider", require("./routes/sliderRoutes"));
app.use("/api/v1/customer", require("./routes/customerRoutes"));
app.use("/api/v1/service", require("./routes/serviceRoutes"));

app.use("/api/v1/about", require("./routes/aboutRoutes"));

app.use(upload());
app.use("/api/v1/request", require("./routes/requestRoutes"));
app.use("/api/v1/jobRequest", require("./routes/JobRequestRoutes"));

app.get("/", (req, res, next) => {
  res.send("From Node Server Api");
});

// const PORT = process.env.PORT || 3000;
// const PORT = SERVER_PORT || 3000;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}`);
});

// Error Handler Middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});

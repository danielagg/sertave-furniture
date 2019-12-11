const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(helmet());
app.use(logger("dev"));

// Serve the React application
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = normalizePort(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`API listening on port: ${port}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//dependies middlewares
const body_parser = require("body-parser");
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(express.json());
app.use(cors());

const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("server working fine..");
// });

//require routes file
const router = require("./Routers/Routers");
app.use("/", router);

//require database file connect db
require("./DB/db.config.connection");

//create server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});




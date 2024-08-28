const mongoose = require("mongoose");

//database info
const username = "shubhamjaiswal";
const password = "AKoTTxQRyuU3NA1K";
const dbname = "ecommercedatabase";

const db_cluster_url = `mongodb+srv://${username}:${password}@cluster0.08polbo.mongodb.net/${dbname}?retryWrites=true&w=majority`;

//connect database
mongoose
  .connect(db_cluster_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection successfull");
  })
  .catch((err) => {
    console.log("db connection unsuccessfull", err , err.message);
  });

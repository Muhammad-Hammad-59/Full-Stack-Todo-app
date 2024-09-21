require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { connectToMongoDB } = require("./database");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./router");

app.use("/api", router);

const port = process.env.PORT || 8000;

const startServer = async () => {
  await connectToMongoDB();

  app.listen(port, () => {
    console.log(`server listening at port no ${port}`);
  });
};

startServer();

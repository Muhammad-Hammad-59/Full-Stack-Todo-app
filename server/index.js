require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
import cors from "cors";

 
app.use(
  cors({
    origin: process.env.FRONTEND_URL,  
    methods: "GET,POST,PUT,DELETE",                 
  })
);

const app = express();
const { connectToMongoDB } = require("./database");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./router");

app.use("/api", router);
app.get("/",(req,res)=>{
   res.status(201).json({message: "request success"})
})

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

const port = process.env.PORT || 5000;
const uri=process.env.MONGODB_URI;

const startServer = async () => {
  await connectToMongoDB(uri);

  app.listen(port, () => {
    console.log(`server listening at port no ${port}`);
  });
};

startServer();

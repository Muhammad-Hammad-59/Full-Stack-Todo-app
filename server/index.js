require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require ("cors")


const app = express();
const { connectToMongoDB } = require("./database");
const forntendurl=process.env.FRONTEND_URL
console.log(`frontend url: ${forntendurl}`)

app.use(
 cors({
   origin: process.env.FRONTEND_URL,  
   methods: "GET,POST,PUT,DELETE",                 
 })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./router");

app.use("/api", router);
app.get("/",(req,res)=>{
   res.status(201).json({message: "request success"})
})

app.get('/health', (req, res) => {
  res.status(200).json({ message: "server is running health check", status: 'OK'});
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

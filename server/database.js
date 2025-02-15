require("dotenv").config();

const mongoose = require("mongoose");

const { MongoClient, ServerApiVersion } = require("mongodb");
const { version } = require("os");

// const uri =  "mongodb+srv://muhammadhammad:hammad221133@mernstack.prqxf.mongodb.net/?retryWrites=true&w=majority&appName=MernStack";
// console.log("url of the database", uri);

//  const option = {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//  };

let client;

const connectToMongoDB = async () => {
  if (!client) {
    try {
      client = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("connected to mongodb");
    } catch (error) {
      console.log(error);
    }
  }
  return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };

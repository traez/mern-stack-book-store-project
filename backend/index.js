import express from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import 'dotenv/config';
import path from "path";
const __dirname = path.resolve();

const port = process.env.PORT
const uri = process.env.mongoDBURL

const app = express();

app.use(express.json());
app.use(cors());
app.use("/books", booksRoute);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
);

/*
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MernStack Book-Store Project Backend");
});
*/

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB using Mongoose");
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();
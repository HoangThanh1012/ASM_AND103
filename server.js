const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Kết nối MongoDB
mongoose.connect("mongodb+srv://hbtezx:thanh1012@cluster0.rm5n6.mongodb.net/carDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const carSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  imageUrl: String,
});

const Car = mongoose.model("Car", carSchema);

// Route cho trang chủ
app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Car API!");
});

// API Endpoint để lấy tất cả xe
app.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


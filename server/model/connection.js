import mongoose from "mongoose";
const url = "mongodb://localhost:27017/todo-data";
mongoose.connect(url);
console.log("db is connected");

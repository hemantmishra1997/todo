import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.listen(3010);
console.log("http://localhost:3010");

//route
import mainRoute from "./routes/route.js";

//middlware
app.use(cors())
app.use(bodyParser.json());


app.use("/webapi",mainRoute);

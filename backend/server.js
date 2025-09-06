import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes/index.js";

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello User, Welcome to SimpliShop : Your One-Stop Online Shop");
});

app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});

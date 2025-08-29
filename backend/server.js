const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");

require("dotenv").config();

const port = process.env.PORT || 3000;
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

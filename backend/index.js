const connectToMongo = require("./db");
const express = require("express");
const app = express();
var cors = require("cors");
connectToMongo();

const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Process running in ${port} port`);
});

const connectToMongo = require("./db");
const express = require("express");
const app = express();

connectToMongo();

const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Process running in 3000 port`);
});

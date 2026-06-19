require("dotenv").config();
const express = require("express");
const connectdb = require("./config/db.js");
const start = require("./routes/startuproutes.js")
const authRouter = require("./routes/authRoutes.js");
const app2 = require("./routes/approutes.js");

connectdb();

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

app.use("/startup", start);
app.use("/application", app2);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("startup platform server is working");
});
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
require("dotenv").config();

const connectdb = require("./config/db.js");
const { io, app, httpServer } = require("./socket-instance.js");


const { savesockets } = require("./socket.js");


const start = require("./routes/startuproutes.js")
const authRouter = require("./routes/authRoutes.js");
const app2 = require("./routes/approutes.js");

connectdb();



io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    socket.on("register", (userId) => {
        savesockets(userId, socket.id);
        console.log(`user ${userId} registered with socket ${socket.id}`);
    });
});
app.use("/auth", authRouter);

app.use("/startup", start);
app.use("/application", app2);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("startup platform server is working");
});
httpServer.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
module.exports = { io };
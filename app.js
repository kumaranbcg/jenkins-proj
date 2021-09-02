require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
let routers = require("./routes/routes.js");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
if (fs.existsSync(process.env.DB_PASSWORD)) {
    process.env.DB_USERNAME = fs.readFileSync(`${process.env.DB_USERNAME}`, { encoding: "utf8" });
    process.env.DB_PASSWORD = fs.readFileSync(`${process.env.DB_PASSWORD}`, { encoding: "utf8" });
}
// middle wares section
app.enable("trust proxy");
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use(routers);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`App listening at port ${port}`));
module.exports = server;

const express = require("express");
const router = express.Router();
router.get("/myservice-1", (err, res) => {
    return res.send("I am Service 1");
});
router.get("/myservice-1/hello", (err, res) => {
    return res.send("Saying hellooo...");
});
module.exports = router;

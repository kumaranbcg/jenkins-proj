const express = require("express");
const router = express.Router();
router.get("/healthcheck", (err, res) => {
    return res.send(`
        I am Healthcheck Service 1 
        Node env: ${process.env.NODE_ENV}
        DB username: ${process.env.DB_USERNAME}
        DB password: ${process.env.DB_PASSWORD}
        `);
});
router.get("/myservice-1", (err, res) => {
    return res.send("I am Service two");
});
router.get("/myservice-1/hello", (err, res) => {
    return res.send("Saying hello...");
});
module.exports = router;

const express = require("express");
const router = express.Router();
const vcaReport = require("./vcaReport");
const masters = require("./masters");

router.use("/masters", masters);
router.use("/vcaReport", vcaReport);
module.exports = router;

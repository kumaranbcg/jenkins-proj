const express = require("express");
const router = express.Router();
const { MastersController } = require("../../controllers");
const validators = require("../../validators");
const { verifyToken } = require("../../utils");

router.get("/getCountryList", verifyToken, MastersController.getCountryList);

router.get("/getStateList", verifyToken, MastersController.getStateList);

router.get("/getUnitsList", verifyToken, validators.getUnitsList, MastersController.getUnitsList);

router.get("/getStageList", verifyToken, MastersController.getStageList);

router.get("/getChannelList", verifyToken, MastersController.getChannelList);

router.get("/getDistrictList", verifyToken, MastersController.getDistrictList);

router.get("/getActivityList", verifyToken, MastersController.getActivityList);

router.get(
    "/getCommodityList",
    verifyToken,
    validators.getCommodityList,
    MastersController.getCommodityList
);

module.exports = router;

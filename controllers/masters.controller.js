const service = require("./../services/masters.service");
const errorCodes = require("../config/errorCodes.js");
const { response } = require("../utils/index");
class MastersController { }

MastersController.prototype.getDistrictList = async (req, res) => {
    try {
        let result = await service.getDistrictListSerivce({ ...req.query });
        response.success(req, res, result.code, result.data, result.message);
    } catch (err) {
        response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
    }
};

MastersController.prototype.getCountryList = async (req, res) => {
    try {
        let result = await service.getCountryListSerivce({ ...req.query });
        response.success(req, res, result.code, result.data, result.message);
    } catch (err) {
        response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
    }
};

MastersController.prototype.getStateList = async (req, res) => {
    try {
        let result = await service.getStateListSerivce({ ...req.query });
        response.success(req, res, result.code, result.data, result.message);
    } catch (err) {
        response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
    }
};

MastersController.prototype.getUnitsList = async (req, res) => {
    try {
        let result = await service.getUnitsListSerivce({ ...req.query });
        response.success(req, res, result.code, result.data, result.message);
    } catch (err) {
        response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
    }
};

MastersController.prototype.getStageList = async (req, res) => {
    try {
        let result = await service.getStageListSerivce({ ...req.query });
        response.success(req, res, result.code, result.data, result.message);
    } catch (err) {
        response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
    }
};

MastersController.prototype.getChannelList = async (req, res) => {
    try {
        let result = await service.getChannelListSerivce({ ...req.query });
        response.success(req, res, result.code, result.data, result.message);
    } catch (err) {
        response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
    }
};

MastersController.prototype.getActivityList = async (req, res) => {
    try {
        let result = await service.getActivityListSerivce({ ...req.query });
        response.success(req, res, result.code, result.data, result.message);
    } catch (err) {
        response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
    }
};

MastersController.prototype.getCommodityList = async (req, res) => {
    try {
        let result = await service.getCommodityListSerivce({ ...req.query });
        response.success(req, res, result.code, result.data, result.message);
    } catch (err) {
        response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
    }
};



module.exports = new MastersController();


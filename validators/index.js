const BaseJoi = require("joi");
const response = require("../utils/response");
const vcaReport = require("./vcaReport");
const schemas = {
    getCommodityList: BaseJoi.object({
        activityId: BaseJoi.number().positive().required(),
    }),
    getUnitsList: BaseJoi.object({
        reportType: BaseJoi.string().required(),
    }),
    getSingedUrl: BaseJoi.object({
        fileKeys: BaseJoi.array().items(BaseJoi.string().required()).required(),
    }),
};

const options = {
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
    },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true,
        },
    },
};

const getCommodityList = async (req, res, next) => {
    var schema = schemas.getCommodityList;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        response.joierrors(req, res, err);
    }
};
const getUnitsList = async (req, res, next) => {
    var schema = schemas.getUnitsList;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        response.joierrors(req, res, err);
    }
};
const getSingedUrl = async (req, res, next) => {
    var schema = schemas.getSingedUrl;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.body }, option);
        next();
    } catch (err) {
        response.joierrors(req, res, err);
    }
};

module.exports.getCommodityList = getCommodityList;
module.exports.getUnitsList = getUnitsList;
module.exports.getSingedUrl = getSingedUrl;
module.exports.createVcaReport = vcaReport.createVcaReport;
module.exports.deleteVcaReport = vcaReport.deleteVcaReport;
module.exports.hardDeleteVcaReport = vcaReport.hardDeleteVcaReport;
module.exports.submitVcaReport = vcaReport.submitVcaReport;
module.exports.getVcaReportById = vcaReport.getVcaReportById;
module.exports.reviewVcaReport = vcaReport.reviewVcaReport;
module.exports.approveVcaReport = vcaReport.approveVcaReport;
module.exports.getVcaReportLists = vcaReport.getVcaReportLists;
module.exports.submitVcaComment = vcaReport.submitVcaComment;
module.exports.deleteVcaComment = vcaReport.deleteVcaComment;
module.exports.getVcaComments = vcaReport.getVcaComments;
module.exports.getVcaActivities = vcaReport.getVcaActivities;
module.exports.dashboard = vcaReport.dashboard;

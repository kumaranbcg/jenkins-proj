const BaseJoi = require("joi");
const response = require("../utils/response");
const schemas = {
    createVcaReport: BaseJoi.object({ activityId: BaseJoi.required() }),
    deleteVcaReport: BaseJoi.object({ reportId: BaseJoi.required() }),
    hardDeleteVcaReport: BaseJoi.object({ reportId: BaseJoi.required() }),
    submitVcaReport: BaseJoi.object({ reportId: BaseJoi.required() }),
    getVcaReportById: BaseJoi.object({ reportId: BaseJoi.required() }),
    dashboard: BaseJoi.object({ commodityId: BaseJoi.required() }),
    reviewVcaReport: BaseJoi.object({ reportId: BaseJoi.required() }),
    approveVcaReport: BaseJoi.object({ reportId: BaseJoi.required() }),
    getVcaReportLists: BaseJoi.object({
        search: BaseJoi.optional(),
        page: BaseJoi.number().positive().required(),
        limit: BaseJoi.number().positive().required(),
    }),
    submitVcaComment: BaseJoi.object({
        reportId: BaseJoi.number().positive().allow(0).required(),
        comment: BaseJoi.string().required(),
        replyCommentId: BaseJoi.optional(),
        vcaCommentDocument: BaseJoi.array()
            .items({
                documentUrl: BaseJoi.string().required(),
                documentName: BaseJoi.string().required(),
            })
            .optional(),
    }),
    getVcaComments: BaseJoi.object({
        reportId: BaseJoi.number().positive().allow(0).required(),
        showAll: BaseJoi.boolean().required(),
    }),
    deleteVcaComment: BaseJoi.object({
        reportId: BaseJoi.number().positive().allow(0).required(),
        commentId: BaseJoi.number().positive().allow(0).required(),
    }),
    getVcaActivities: BaseJoi.object({
        activityId: BaseJoi.number().positive().allow(0).required(),
        commodityId: BaseJoi.number().positive().allow(0).required(),
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

const createVcaReport = async (req, res, next) => {
    var schema = schemas.createVcaReport;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const deleteVcaReport = async (req, res, next) => {
    var schema = schemas.deleteVcaReport;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const hardDeleteVcaReport = async (req, res, next) => {
    var schema = schemas.hardDeleteVcaReport;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.body }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const submitVcaReport = async (req, res, next) => {
    var schema = schemas.submitVcaReport;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const getVcaReportById = async (req, res, next) => {
    var schema = schemas.getVcaReportById;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const dashboard = async (req, res, next) => {
    var schema = schemas.dashboard;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const reviewVcaReport = async (req, res, next) => {
    var schema = schemas.reviewVcaReport;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const approveVcaReport = async (req, res, next) => {
    var schema = schemas.approveVcaReport;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const getVcaReportLists = async (req, res, next) => {
    var schema = schemas.getVcaReportLists;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const submitVcaComment = async (req, res, next) => {
    var schema = schemas.submitVcaComment;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.body }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const deleteVcaComment = async (req, res, next) => {
    var schema = schemas.deleteVcaComment;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const getVcaComments = async (req, res, next) => {
    var schema = schemas.getVcaComments;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const getVcaActivities = async (req, res, next) => {
    var schema = schemas.getVcaActivities;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const throwError = (req, res, err) => {
    return response.joierrors(req, res, err);
};

module.exports.createVcaReport = createVcaReport;
module.exports.deleteVcaReport = deleteVcaReport;
module.exports.hardDeleteVcaReport = hardDeleteVcaReport;
module.exports.submitVcaReport = submitVcaReport;
module.exports.getVcaReportById = getVcaReportById;
module.exports.dashboard = dashboard;
module.exports.reviewVcaReport = reviewVcaReport;
module.exports.approveVcaReport = approveVcaReport;
module.exports.getVcaReportLists = getVcaReportLists;
module.exports.submitVcaComment = submitVcaComment;
module.exports.deleteVcaComment = deleteVcaComment;
module.exports.getVcaComments = getVcaComments;
module.exports.getVcaActivities = getVcaActivities;

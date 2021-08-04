const errorCodes = require("./../config/errorCodes.js");
const errMessages = require("./../config/errorMsgs");
const { response } = require("../utils/index");
const vcaService = require("../services/index");
const { COMMODITY_IDS } = require("../constants");
class VcaReportController {
    async createVcaReport(req, res) {
        try {
            req.query.commodityId = req.query.commodityId ? req.query.commodityId : null;
            let result = await vcaService.createReportService({ ...req.query, ...req.user });
            if (result.code == errorCodes.HTTP_OK) {
                await vcaService.vcaDocUploadSerivce({
                    reportId: result.data.reportId,
                    version: result.data.version,
                    documentTitle: result.data.documentTitle,
                });
                result.data = { reportId: result.data.reportId };
            }
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async deleteVcaReport(req, res) {
        try {
            req.query.userData = req.user;
            let result = await vcaService.isReportDeleted(req.query.reportId);
            if (result) return response.invalid(req, res, result.code, result.message);
            result = await vcaService.deleteVcaReportService({ ...req.query });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async hardDeleteVcaReport(req, res) {
        try {
            let result = await vcaService.hardDeleteVcaReportService({ ...req.body });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async fillVcaReport(req, res) {
        try {
            let result = await vcaService.isReportSubmitted(req.body.reportId);
            if (result) return response.invalid(req, res, result.code, result.message);
            const { commodityId, activityId, applicationStatus } = await vcaService.getReport(
                req.body.reportId
            );
            const activityCommodity = activityId == COMMODITY_IDS.FARM ? activityId : commodityId;
            switch (activityCommodity) {
                case COMMODITY_IDS.FARM: {
                    result = await vcaService.fillVcaFarmReportService({
                        ...req.body,
                        ...req.query,
                        applicationStatus,
                        userData: req.user,
                    });
                    break;
                }
                case COMMODITY_IDS.OFF_FARM_DAIRY: {
                    result = await vcaService.fillVcaOffFarmDairyReportService({
                        ...req.body,
                        ...req.query,
                        applicationStatus,
                        userData: req.user,
                    });
                    break;
                }
                case COMMODITY_IDS.OFF_FARM_FISHERIES: {
                    result = await vcaService.fillVcaOffFarmFisheriesReportService({
                        ...req.body,
                        ...req.query,
                        applicationStatus,
                        userData: req.user,
                    });
                    break;
                }
                default: {
                    return response.invalid(
                        req,
                        res,
                        errorCodes.HTTP_BAD_REQUEST,
                        errMessages.reportNotFound
                    );
                }
            }
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async submitVcaReport(req, res) {
        try {
            let result = await vcaService.isReportSubmitted(req.query.reportId);
            if (result) return response.invalid(req, res, result.code, result.message);
            result = await vcaService.submitVcaReportService({ ...req.query, userData: req.user });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getVcaReportById(req, res) {
        try {
            let result = await vcaService.isReportVisible(req.query.reportId);
            if (result) return response.invalid(req, res, result.code, result.message);
            const { commodityId, activityId } = await vcaService.getReport(req.query.reportId);
            const activityCommodity = activityId == COMMODITY_IDS.FARM ? activityId : commodityId;
            result = await vcaService.getVcaReportByIdService({ ...req.query, activityCommodity });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async reviewVcaReport(req, res) {
        try {
            let result = await vcaService.isReportReviewed(req.query.reportId);
            if (result) return response.invalid(req, res, result.code, result.message);
            result = await vcaService.reviewVcaReportService({ ...req.query, userData: req.user });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async approveVcaReport(req, res) {
        try {
            let result = await vcaService.isReportApproved(req.query.reportId);
            if (result) return response.invalid(req, res, result.code, result.message);
            result = await vcaService.approveVcaReportService({ ...req.query, userData: req.user });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getVcaReports(req, res) {
        try {
            const result = await vcaService.getVcaReportsService({
                ...req.query,
                userData: req.user,
            });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getVcaReportLists(req, res) {
        try {
            const result = await vcaService.getVcaReportListsService({
                ...req.query,
                userData: req.user,
            });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async dashboard(req, res) {
        try {
            const result = await vcaService.dashboardService({ ...req.query, userData: req.user });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async submitVcaComment(req, res) {
        try {
            let result = await vcaService.isReportComment(req.body.reportId);
            if (result) return response.invalid(req, res, result.code, result.message);
            result = await vcaService.submitVcaCommentService({ ...req.body, userData: req.user });
            if (result.code != errorCodes.HTTP_OK)
                return response.invalid(req, res, result.code, result.message);
            result = await vcaService.getVcaCommentsService({
                ...req.body,
                showAll: "true",
                userData: req.user,
            });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async deleteVcaComment(req, res) {
        try {
            let result = await vcaService.isReportComment(req.query.reportId);
            if (result) return response.invalid(req, res, result.code, result.message);
            result = await vcaService.deleteVcaCommentService({ ...req.query, userData: req.user });
            if (result.code != errorCodes.HTTP_OK)
                return response.invalid(req, res, result.code, result.message);
            result = await vcaService.getVcaCommentsService({
                ...req.query,
                showAll: "true",
                userData: req.user,
            });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getVcaComments(req, res) {
        try {
            let result = await vcaService.isReportVisible(req.query.reportId);
            if (result) return response.invalid(req, res, result.code, result.message);
            result = await vcaService.getVcaCommentsService({ ...req.query, userData: req.user });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getVcaActivities(req, res) {
        try {
            const result = await vcaService.getVcaActivitiesService({ ...req.query });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async uploadDoc(req, res) {
        try {
            const documentUrls = [];
            if (req.files && req.files.errors) {
                return response.invalid(
                    req,
                    res,
                    errorCodes.HTTP_BAD_REQUEST,
                    errMessages.invalidDocType
                );
            }
            if (req.body && req.body.errors) {
                return response.invalid(
                    req,
                    res,
                    errorCodes.HTTP_BAD_REQUEST,
                    errMessages.docUploadFailed
                );
            }
            await req.files.forEach((file) => {
                documentUrls.push({ url: file.key, originalname: file.originalname });
            });
            response.success(req, res, errorCodes.HTTP_OK, documentUrls, errMessages.success);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getSingedUrl(req, res) {
        try {
            let result = await vcaService.getSingedUrlService({ ...req.body });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
}
module.exports = new VcaReportController();

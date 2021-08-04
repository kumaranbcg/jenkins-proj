const models = require("../models");
const messages = require("./../config/errorMsgs.js");
const errorCodes = require("./../config/errorCodes.js");
const {
    VCA_REPORT_STATUS,
    DELETE_STATUS,
    VCA_FARM_STAGE,
    VCA_OFF_FARM_DAIRY_STAGE,
    VCA_OFF_FARM_FISHERIES_STAGE,
    ACTION,
    COMMODITY_IDS,
    MESSAGE_TYPE,
    IS_DELETED,
    STAFF_STATUS,
} = require("../constants");
const vcaFarmService = require("../services/vcaFarm.service");
const vcaOffFarmFisheriesService = require("../services/vcaOffFarmFisheries.service");
const notification = require("../utils/notification");
const { Op } = require("sequelize");
const { sequelize } = models;
const aws = require("aws-sdk");
aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: process.env.S3_REGION,
});
const s3 = new aws.S3();
class VcaReportService {
    async getReport(reportId) {
        try {
            let reportData = await models.vcaReport.findOne({
                where: { reportId },
                attributes: models.vcaReport.selectedFields,
                raw: true,
            });
            return reportData;
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async isReportVisible(reportId) {
        try {
            let reportData = await this.getReport(reportId);
            if (!reportData)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.reportNotFound };
            if (reportData.status == DELETE_STATUS.INACTIVE)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.alreadyDeleted };
            return false;
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async isReportDeleted(reportId) {
        try {
            let reportData = await this.getReport(reportId);
            if (!reportData)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.reportNotFound };
            if (reportData.status == DELETE_STATUS.INACTIVE)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.alreadyDeleted };
            let message = {
                [VCA_REPORT_STATUS.DRAFT]: false,
                [VCA_REPORT_STATUS.IN_PROGRESS]: false,
                [VCA_REPORT_STATUS.REVIEWED]: messages.reportCannotDeleted,
                [VCA_REPORT_STATUS.APPROVED]: messages.reportCannotDeleted,
            }[reportData.applicationStatus];
            if (!message) return false;
            return { code: errorCodes.HTTP_CONFLICT, message };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async isReportSubmitted(reportId) {
        try {
            let reportData = await this.getReport(reportId);
            if (!reportData)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.reportNotFound };
            if (reportData.status == DELETE_STATUS.INACTIVE)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.alreadyDeleted };
            let message = {
                [VCA_REPORT_STATUS.DRAFT]: false,
                [VCA_REPORT_STATUS.IN_PROGRESS]: false,
                [VCA_REPORT_STATUS.REVIEWED]: messages.reportCannotEdited,
                [VCA_REPORT_STATUS.APPROVED]: messages.reportCannotEdited,
            }[reportData.applicationStatus];
            if (!message) return false;
            return { code: errorCodes.HTTP_CONFLICT, message };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async isReportComment(reportId) {
        try {
            let reportData = await this.getReport(reportId);
            if (!reportData)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.reportNotFound };
            if (reportData.status == DELETE_STATUS.INACTIVE)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.alreadyDeleted };
            let message = {
                [VCA_REPORT_STATUS.DRAFT]: messages.reportCannotComment,
                [VCA_REPORT_STATUS.IN_PROGRESS]: false,
                [VCA_REPORT_STATUS.REVIEWED]: messages.reportCannotComment,
                [VCA_REPORT_STATUS.APPROVED]: false,
            }[reportData.applicationStatus];
            if (!message) return false;
            return { code: errorCodes.HTTP_CONFLICT, message };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async isReportReviewed(reportId) {
        try {
            let reportData = await this.getReport(reportId);
            if (!reportData)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.reportNotFound };
            if (reportData.status == DELETE_STATUS.INACTIVE)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.alreadyDeleted };
            let message = {
                [VCA_REPORT_STATUS.DRAFT]: messages.reportCannotReviewed,
                [VCA_REPORT_STATUS.IN_PROGRESS]: false,
                [VCA_REPORT_STATUS.REVIEWED]: messages.reportAlreadyReviewed,
                [VCA_REPORT_STATUS.APPROVED]: messages.reportAlreadyReviewed,
            }[reportData.applicationStatus];
            if (!message) return false;
            return { code: errorCodes.HTTP_CONFLICT, message };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async isReportApproved(reportId) {
        try {
            let reportData = await this.getReport(reportId);
            if (!reportData)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.reportNotFound };
            if (reportData.status == DELETE_STATUS.INACTIVE)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.alreadyDeleted };
            let message = {
                [VCA_REPORT_STATUS.DRAFT]: messages.reportCannotApproved,
                [VCA_REPORT_STATUS.IN_PROGRESS]: messages.reportCannotApproved,
                [VCA_REPORT_STATUS.REVIEWED]: false,
                [VCA_REPORT_STATUS.APPROVED]: messages.reportAlreadyApproved,
            }[reportData.applicationStatus];
            if (!message) return false;
            return { code: errorCodes.HTTP_CONFLICT, message };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async createReportService(params) {
        try {
            const { userId, activityId, commodityId, moduleId } = params;
            const pendingReport = await models.vcaReport.findOne({
                where: {
                    applicationStatus: [
                        VCA_REPORT_STATUS.DRAFT,
                        VCA_REPORT_STATUS.IN_PROGRESS,
                        VCA_REPORT_STATUS.REVIEWED,
                    ],
                    activityId,
                    commodityId,
                    status: DELETE_STATUS.ACTIVE,
                },
                raw: true,
            });
            const commentsRole = await models.permissionView.findAll({
                attributes: models.permissionView.selectedFields,
                where: { moduleId, isPermission: true, actionKey: ACTION.COMMENT },
                raw: true,
            });
            const activityData = await models.activityMaster.findOne({
                where: { value: activityId },
                attributes: models.activityMaster.selectedFields,
                raw: true,
            });
            const commodityData = await models.commodityMaster.findOne({
                where: { value: commodityId, isReport: true },
                attributes: models.commodityMaster.selectedFields,
                raw: true,
            });
            if (activityId != COMMODITY_IDS.FARM && !commodityData) {
                return {
                    code: errorCodes.HTTP_UNPROCESSABLE_ENTITY,
                    message: messages.validActivityReq,
                };
            }
            const documentTitle = `${
                activityId == COMMODITY_IDS.FARM ? activityData.label : commodityData.label
            } VCA Report`;
            if (pendingReport && activityId != COMMODITY_IDS.FARM) {
                return { code: errorCodes.HTTP_CONFLICT, message: messages.vcaReportPending };
            }
            const getVersion = await models.vcaReport.findOne({
                where: {
                    applicationStatus: VCA_REPORT_STATUS.APPROVED,
                    activityId,
                    commodityId,
                    status: DELETE_STATUS.ACTIVE,
                },
                attributes: models.vcaReport.selectedFields,
                order: [["VCA08_VERSION_D", "DESC"]],
                raw: true,
            });
            const version = getVersion ? getVersion.version + 1 : 1;
            let reportData = await models.vcaReport.create({
                applicationStatus: VCA_REPORT_STATUS.DRAFT,
                version,
                activityId,
                commodityId,
                VCA08_CREATED_D: userId,
                VCA08_UPDATED_D: userId,
            });
            reportData = reportData.get({ plain: true });
            await models.vcaOverview.create({ reportId: reportData.reportId, commodityId });
            await models.vcaCommentsRead.bulkCreate([
                ...commentsRole.reduce(
                    (res, curr) => [...res, { reportId: reportData.reportId, role: curr.roleId }],
                    []
                ),
            ]);
            return {
                code: errorCodes.HTTP_OK,
                message: messages.reportCreated,
                data: { reportId: reportData.reportId, version, documentTitle },
            };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async deleteVcaReportService(params) {
        try {
            const { reportId, userData } = params;
            await models.vcaReport.update(
                {
                    VCA08_CREATED_D: userData.userId,
                    VCA08_UPDATED_D: userData.userId,
                    status: DELETE_STATUS.INACTIVE,
                },
                { where: { reportId } }
            );
            return { code: errorCodes.HTTP_OK, message: messages.reportDeleted };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async hardDeleteVcaReportService(params) {
        try {
            const { reportId } = params;
            await models.vcaReport.destroy({ where: { reportId } });
            return { code: errorCodes.HTTP_OK, message: messages.reportDeleted };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async fillVcaFarmReportService(params) {
        try {
            const { stage } = params;
            let result;
            switch (Number(stage)) {
                case VCA_FARM_STAGE.OVERVIEW.VALUE: {
                    result = await vcaFarmService.vcaFarmOverviewSerivce({ ...params });
                    break;
                }
                case VCA_FARM_STAGE.GEOGRAPHY.VALUE: {
                    result = await vcaFarmService.vcaFarmGeographySerivce({ ...params });
                    break;
                }
                case VCA_FARM_STAGE.DISTRICTS_COVERED.VALUE: {
                    result = await vcaFarmService.vcaFarmDistrictsCoveredSerivce({ ...params });
                    break;
                }
                case VCA_FARM_STAGE.COMMODITY_DETAILS.VALUE: {
                    result = await vcaFarmService.vcaFarmCommodityDetailsSerivce({ ...params });
                    break;
                }
                case VCA_FARM_STAGE.GROUP_DETAILS.VALUE: {
                    result = await this.vcaGroupDetailsSerivce({ ...params });
                    break;
                }
                case VCA_FARM_STAGE.ACTIVITES.VALUE: {
                    result = await vcaFarmService.vcaFarmActivitiesSerivce({ ...params });
                    break;
                }
                case VCA_FARM_STAGE.SWOT_ANALYSIS.VALUE: {
                    result = await this.vcaSwotAnalysisSerivce({ ...params });
                    break;
                }
                case VCA_FARM_STAGE.DOC_UPLOAD.VALUE: {
                    result = await this.vcaDocUploadSerivce({ ...params });
                    break;
                }
                default: {
                    return {
                        code: errorCodes.HTTP_UNPROCESSABLE_ENTITY,
                        message: messages.stageReq,
                    };
                }
            }
            return { code: result.code, message: result.message };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR };
        }
    }
    async fillVcaOffFarmDairyReportService(params) {
        try {
            const { stage } = params;
            let result;
            switch (Number(stage)) {
                case VCA_OFF_FARM_DAIRY_STAGE.OVERVIEW.VALUE: {
                    break;
                }
                case VCA_OFF_FARM_DAIRY_STAGE.GEOGRAPHY.VALUE: {
                    break;
                }
                case VCA_OFF_FARM_DAIRY_STAGE.DISTRICTS_COVERED.VALUE: {
                    break;
                }
                case VCA_OFF_FARM_DAIRY_STAGE.COMMODITY_DETAILS.VALUE: {
                    break;
                }
                case VCA_OFF_FARM_DAIRY_STAGE.GROUP_DETAILS.VALUE: {
                    result = await this.vcaGroupDetailsSerivce({ ...params });
                    break;
                }
                case VCA_OFF_FARM_DAIRY_STAGE.ACTIVITES.VALUE: {
                    break;
                }
                case VCA_OFF_FARM_DAIRY_STAGE.SWOT_ANALYSIS.VALUE: {
                    result = await this.vcaSwotAnalysisSerivce({ ...params });
                    break;
                }
                case VCA_OFF_FARM_DAIRY_STAGE.DOC_UPLOAD.VALUE: {
                    result = await this.vcaDocUploadSerivce({ ...params });
                    break;
                }
                default: {
                    return {
                        code: errorCodes.HTTP_UNPROCESSABLE_ENTITY,
                        message: messages.stageReq,
                    };
                }
            }
            return { code: result.code, message: result.message };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR };
        }
    }
    async fillVcaOffFarmFisheriesReportService(params) {
        try {
            const { stage } = params;
            let result;
            switch (Number(stage)) {
                case VCA_OFF_FARM_FISHERIES_STAGE.OVERVIEW.VALUE: {
                    result = await vcaOffFarmFisheriesService.vcaOffFarmFisheriesOverviewSerivce({
                        ...params,
                    });
                    break;
                }
                case VCA_OFF_FARM_FISHERIES_STAGE.GEOGRAPHY.VALUE: {
                    result = await vcaOffFarmFisheriesService.vcaOffFarmFisheriesGeographySerivce({
                        ...params,
                    });
                    break;
                }
                case VCA_OFF_FARM_FISHERIES_STAGE.DISTRICTS_COVERED.VALUE: {
                    result =
                        await vcaOffFarmFisheriesService.vcaOffFarmFisheriesDistrictsCoveredSerivce(
                            { ...params }
                        );
                    break;
                }
                case VCA_OFF_FARM_FISHERIES_STAGE.COMMODITY_DETAILS.VALUE: {
                    result =
                        await vcaOffFarmFisheriesService.vcaOffFarmFisheriesCommodityDetailsSerivce(
                            { ...params }
                        );
                    break;
                }
                case VCA_OFF_FARM_FISHERIES_STAGE.GROUP_DETAILS.VALUE: {
                    result = await this.vcaGroupDetailsSerivce({ ...params });
                    break;
                }
                case VCA_OFF_FARM_FISHERIES_STAGE.ACTIVITES.VALUE: {
                    result = await vcaOffFarmFisheriesService.vcaOffFarmFisheriesActivitiesSerivce({
                        ...params,
                    });
                    break;
                }
                case VCA_OFF_FARM_FISHERIES_STAGE.SWOT_ANALYSIS.VALUE: {
                    result = await this.vcaSwotAnalysisSerivce({ ...params });
                    break;
                }
                case VCA_OFF_FARM_FISHERIES_STAGE.DOC_UPLOAD.VALUE: {
                    result = await this.vcaDocUploadSerivce({ ...params });
                    break;
                }
                default: {
                    return {
                        code: errorCodes.HTTP_UNPROCESSABLE_ENTITY,
                        message: messages.stageReq,
                    };
                }
            }
            return { code: result.code, message: result.message };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR };
        }
    }
    async vcaGroupDetailsSerivce(params) {
        try {
            const { reportId, applicationStatus, userData } = params;
            await models.vcaGroupDetails.destroy({ where: { reportId } });
            await models.vcaGroupDetails.create({ ...params });
            if (applicationStatus == VCA_REPORT_STATUS.IN_PROGRESS) {
                await models.vcaEditActivity.create({
                    reportId,
                    section: VCA_FARM_STAGE.GROUP_DETAILS.LABEL,
                    VCA26_CREATED_D: userData.userId,
                    VCA26_UPDATED_D: userData.userId,
                });
            }
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async vcaSwotAnalysisSerivce(params) {
        try {
            const { reportId, applicationStatus, userData } = params;
            await models.vcaSwotAnalysis.destroy({ where: { reportId } });
            await models.vcaSwotAnalysis.create({ ...params });
            if (applicationStatus == VCA_REPORT_STATUS.IN_PROGRESS) {
                await models.vcaEditActivity.create({
                    reportId,
                    section: VCA_FARM_STAGE.OVERVIEW.LABEL,
                    VCA26_CREATED_D: userData.userId,
                    VCA26_UPDATED_D: userData.userId,
                });
            }
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async vcaDocUploadSerivce(params) {
        try {
            const { reportId, applicationStatus, userData } = params;
            const reportData = await models.vcaDocUpload.findOne({
                where: { reportId },
                raw: true,
            });
            if (reportData) {
                await models.vcaDocUpload.update({ ...params }, { where: { reportId } });
            } else {
                await models.vcaDocUpload.create({ ...params });
            }
            if (applicationStatus == VCA_REPORT_STATUS.IN_PROGRESS) {
                await models.vcaEditActivity.create({
                    reportId,
                    section: VCA_FARM_STAGE.OVERVIEW.LABEL,
                    VCA26_CREATED_D: userData.userId,
                    VCA26_UPDATED_D: userData.userId,
                });
            }
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async submitVcaReportService(params) {
        try {
            const { reportId, userData } = params;
            const sectionsData = await models.vcaReportView.findOne({
                where: { reportId },
                attributes: models.vcaReportView.selectedFields,
                raw: true,
            });
            if (!sectionsData || sectionsData.filled != sectionsData.totalSection)
                return { code: errorCodes.HTTP_CONFLICT, message: messages.notFilled };
            if (VCA_REPORT_STATUS.DRAFT == sectionsData.applicationStatus) {
                await models.vcaReport.update(
                    {
                        VCA08_CREATED_AT: models.sequelize.literal("CURRENT_TIMESTAMP"),
                        applicationStatus: VCA_REPORT_STATUS.IN_PROGRESS,
                    },
                    { where: { reportId } }
                );
            }
            const reviewUser = await models.permissionView.findAll({
                where: {
                    actionKey: { [Op.in]: [ACTION.REVIEW] },
                    isPermission: true,
                    moduleId: userData.moduleId,
                },
                attributes: ["roleId", "roleName", "groupName"],
                raw: true,
            });
            const toUserDetails = await models.staffMasterView.findAll({
                where: {
                    roleId: reviewUser
                        .filter((x) => x.roleId != userData.roleId)
                        .map((x) => x.roleId),
                    status: STAFF_STATUS.ACTIVE,
                    isDeleted: IS_DELETED.NOT_DELETED,
                },
                attributes: models.staffMasterView.selectedFields,
                include: {
                    model: models.staffAddressView,
                    where: { districtId: userData.districtId },
                    as: "staffAddressView",
                    attributes: [],
                    required: true,
                },
                raw: true,
            });
            const notifyUsers = toUserDetails.reduce(
                (res, curr) => [
                    ...res,
                    {
                        fromUser: userData,
                        data: { reportTitle: sectionsData.documentTitle, reportId },
                        msgType:
                            sectionsData.applicationStatus == VCA_REPORT_STATUS.DRAFT
                                ? MESSAGE_TYPE.UPLOAD
                                : MESSAGE_TYPE.EDIT,
                        toUser: curr,
                    },
                ],
                []
            );
            await notification.sendNotification(notifyUsers);
            return { code: errorCodes.HTTP_OK, message: messages.reportSubmited };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getVcaReportByIdService(params) {
        const { activityCommodity } = params;
        let result;
        switch (activityCommodity) {
            case COMMODITY_IDS.FARM: {
                result = await vcaFarmService.getVcaFarmReportByIdSerivce({ ...params });
                break;
            }
            case COMMODITY_IDS.OFF_FARM_FISHERIES: {
                result = await vcaOffFarmFisheriesService.getVcaOffFarmFisheriesReportByIdSerivce({
                    ...params,
                });
                break;
            }
            default: {
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.reportNotFound };
            }
        }
        return { code: result.code, message: result.message, data: result.data };
    }
    async reviewVcaReportService(params) {
        try {
            const { reportId, userData } = params;
            const reportData = await models.vcaReportView.findOne({
                where: { reportId },
                attributes: models.vcaReportView.selectedFields,
                raw: true,
            });
            await models.vcaReportStatus.destroy({
                where: { applicationStatus: VCA_REPORT_STATUS.REVIEWED, reportId },
            });
            await models.vcaReportStatus.create({
                reportId,
                applicationStatus: VCA_REPORT_STATUS.REVIEWED,
                VCA22_CREATED_D: userData.userId,
                VCA22_UPDATED_D: userData.userId,
            });
            await models.vcaReport.update(
                { applicationStatus: VCA_REPORT_STATUS.REVIEWED },
                { where: { reportId } }
            );
            const approveUser = await models.permissionView.findAll({
                where: {
                    actionKey: { [Op.in]: [ACTION.APPROVE] },
                    isPermission: true,
                    moduleId: userData.moduleId,
                },
                attributes: ["roleId", "roleName", "groupName"],
                raw: true,
            });
            const toUserDetails = await models.staffMasterView.findAll({
                where: {
                    roleId: approveUser
                        .filter((x) => x.roleId != userData.roleId)
                        .map((x) => x.roleId),
                    status: STAFF_STATUS.ACTIVE,
                    isDeleted: IS_DELETED.NOT_DELETED,
                },
                attributes: models.staffMasterView.selectedFields,
                raw: true,
            });
            const notifyUsers = toUserDetails.reduce(
                (res, curr) => [
                    ...res,
                    {
                        fromUser: userData,
                        data: { reportTitle: reportData.documentTitle, reportId },
                        msgType: MESSAGE_TYPE.REVIEW,
                        toUser: curr,
                    },
                ],
                []
            );
            await notification.sendNotification(notifyUsers);
            return { code: errorCodes.HTTP_OK, message: messages.reviewed };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async approveVcaReportService(params) {
        try {
            const { reportId, userData } = params;
            const reportData = await models.vcaReportView.findOne({
                where: { reportId },
                attributes: models.vcaReportView.selectedFields,
                raw: true,
            });
            await models.vcaReportStatus.destroy({
                where: { applicationStatus: VCA_REPORT_STATUS.APPROVED, reportId },
            });
            await models.vcaReportStatus.create({
                reportId,
                applicationStatus: VCA_REPORT_STATUS.APPROVED,
                VCA22_CREATED_D: userData.userId,
                VCA22_UPDATED_D: userData.userId,
            });
            await models.vcaReport.update(
                { applicationStatus: VCA_REPORT_STATUS.APPROVED },
                { where: { reportId } }
            );
            const createUser = await models.permissionView.findAll({
                where: {
                    actionKey: { [Op.in]: [ACTION.CREATE, ACTION.REVIEW] },
                    isPermission: true,
                    moduleId: userData.moduleId,
                },
                attributes: ["roleId", "roleName", "groupName", "actionKey"],
                raw: true,
            });
            const toUserDetails = await models.staffMasterView.findAll({
                where: {
                    roleId: createUser
                        .filter(
                            (x) =>
                                (x.roleId == reportData.roleId && x.actionKey == ACTION.CREATE) ||
                                (x.roleId != userData.roleId && x.actionKey == ACTION.REVIEW)
                        )
                        .map((x) => x.roleId),
                    status: STAFF_STATUS.ACTIVE,
                    isDeleted: IS_DELETED.NOT_DELETED,
                },
                attributes: models.staffMasterView.selectedFields,
                include: {
                    model: models.staffAddressView,
                    where: { districtId: userData.districtId },
                    as: "staffAddressView",
                    attributes: [],
                    required: true,
                },
                raw: true,
            });
            const notifyUsers = toUserDetails.reduce(
                (res, curr) => [
                    ...res,
                    {
                        fromUser: userData,
                        data: { reportTitle: reportData.documentTitle, reportId },
                        msgType: MESSAGE_TYPE.APPROVE,
                        toUser: curr,
                    },
                ],
                []
            );
            await notification.sendNotification(notifyUsers);
            return { code: errorCodes.HTTP_OK, message: messages.approved };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getVcaReportsService(params) {
        try {
            const { districtId, userData } = params;
            const permissionType = userData.permission.find(
                (x) =>
                    (x.actionKey == ACTION.CREATE ||
                        x.actionKey == ACTION.REVIEW ||
                        x.actionKey == ACTION.APPROVE) &&
                    x.isPermission
            );
            const { model, applicationStatus } = {
                [ACTION.CREATE]: {
                    model: models.vcaReportView,
                    applicationStatus: VCA_REPORT_STATUS.DRAFT,
                },
                [ACTION.REVIEW]: {
                    model: models.vcaLatestReportView,
                    applicationStatus: VCA_REPORT_STATUS.IN_PROGRESS,
                },
                [ACTION.APPROVE]: {
                    model: models.vcaLatestReportView,
                    applicationStatus: VCA_REPORT_STATUS.REVIEWED,
                },
            }[permissionType ? permissionType.actionKey : ACTION.APPROVE];
            const districtCondition = districtId ? { districtId } : {};
            const reportList = await model.findAll({
                where: { applicationStatus, ...districtCondition },
                attributes: model.selectedFields,
            });
            return { code: errorCodes.HTTP_OK, message: messages.success, data: reportList };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getVcaReportListsService(params) {
        try {
            const { districtId, userData, limit, page, search } = params;
            const permissionType = userData.permission.find(
                (x) =>
                    (x.actionKey == ACTION.CREATE ||
                        x.actionKey == ACTION.REVIEW ||
                        x.actionKey == ACTION.APPROVE) &&
                    x.isPermission
            );
            const applicationStatus = {
                [ACTION.CREATE]: [
                    VCA_REPORT_STATUS.IN_PROGRESS,
                    VCA_REPORT_STATUS.REVIEWED,
                    VCA_REPORT_STATUS.APPROVED,
                ],
                [ACTION.REVIEW]: [VCA_REPORT_STATUS.REVIEWED, VCA_REPORT_STATUS.APPROVED],
                [ACTION.APPROVE]: [VCA_REPORT_STATUS.APPROVED],
            }[permissionType ? permissionType.actionKey : ACTION.APPROVE];
            const districtCondition = districtId ? { districtId } : {};
            const searchCondition = search
                ? {
                      [Op.or]: [
                          { activityName: { [Op.like]: `%${search}%` } },
                          { commodityName: { [Op.like]: `%${search}%` } },
                          { districtName: { [Op.like]: `%${search}%` } },
                          { applicationStatusLabel: { [Op.like]: `%${search}%` } },
                      ],
                  }
                : {};
            const { rows, count } = await models.vcaLatestStatusReportView.findAndCountAll({
                where: { applicationStatus, ...districtCondition, ...searchCondition },
                attributes: models.vcaLatestStatusReportView.selectedFields,
            });
            const meta = { limit, page, count, total_pages: Math.ceil(count / limit) };
            return {
                code: errorCodes.HTTP_OK,
                message: messages.success,
                data: { list: rows, meta },
            };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async dashboardService(params) {
        try {
            const { commodityId } = params;
            let vcaReport = await models.vcaReport.findOne({
                where: { status: DELETE_STATUS.ACTIVE, commodityId },
                attributes: [
                    ["VCA08_REPORT_D", "reportId"],
                    [sequelize.col("vcaLatestStatusReportView.version"), "version"],
                    [
                        sequelize.col("vcaLatestStatusReportView.applicationStatusLabel"),
                        "applicationStatusLabel",
                    ],
                    [sequelize.col("vcaLatestStatusReportView.uploadedOn"), "uploadedOn"],
                    [sequelize.col("vcaLatestStatusReportView.commodityName"), "commodityName"],
                    [sequelize.col("vcaLatestStatusReportView.commodityId"), "commodityId"],
                    [sequelize.col("vcaGeography.VCA10_INDIA_RANKING_D"), "indiaRanking"],
                    [sequelize.col("vcaGeography.VCA10_TAMIL_NADU_RANKING_D"), "tamilNaduRanking"],

                    [sequelize.col("vcaGeography->countryMaster.VCA03_COUNTRY_NAME_N"), "country"],
                    [sequelize.col("vcaGeography->stateMaster.VCA04_STATE_NAME_N"), "state"],
                    [
                        sequelize.col("vcaGeography->districtMasterView.TNRTP07_DISTRICT_NAME"),
                        "district",
                    ],
                    [
                        sequelize.col("vcaGeography.VCA10_COUNTRY_PRODUCTION_PERCENT_D"),
                        "countryPercent",
                    ],
                    [
                        sequelize.col("vcaGeography.VCA10_STATE_PRODUCTION_PERCENT_D"),
                        "statePercent",
                    ],
                    [
                        sequelize.col("vcaGeography.VCA10_DISTRICT_PRODUCTION_PERCENT_D"),
                        "districtPercent",
                    ],
                ],
                include: [
                    {
                        model: models.vcaGeography,
                        as: "vcaGeography",
                        where: { status: DELETE_STATUS.ACTIVE },
                        attributes: [],
                        required: false,
                        include: [
                            {
                                model: models.countryMaster,
                                as: "countryMaster",
                                attributes: [],
                                where: { status: DELETE_STATUS.ACTIVE },
                                required: false,
                            },
                            {
                                model: models.stateMaster,
                                as: "stateMaster",
                                attributes: [],
                                where: { status: DELETE_STATUS.ACTIVE },
                                required: false,
                            },
                            {
                                model: models.districtMasterView,
                                as: "districtMasterView",
                                attributes: [],
                                where: { status: DELETE_STATUS.ACTIVE },
                                required: false,
                            },
                        ],
                    },
                    {
                        model: models.vcaCommodityDetails,
                        as: "vcaCommodityDetails",
                        attributes: models.vcaCommodityDetails.vcaFarmCommodityDetailsFields,
                        where: {
                            key: {
                                [Op.in]: [
                                    "volProductionIndia",
                                    "volProductionTamilNadu",
                                    "costOfProduction",
                                    "totalDemand",
                                    "totalSupply",
                                    "netImportIndia",
                                    "netExportIndia",
                                    "netImportTamilNadu",
                                    "netExportTamilNadu",
                                ],
                            },
                        },
                        required: false,
                        separate: true,
                    },
                    {
                        model: models.vcaLatestStatusReportView,
                        as: "vcaLatestStatusReportView",
                        where: { applicationStatus: VCA_REPORT_STATUS.APPROVED },
                        attributes: [],
                        required: true,
                    },
                ],
                subQuery: false,
            });
            if (!vcaReport) {
                return {
                    code: errorCodes.HTTP_NOT_FOUND,
                    message: messages.reportNotFound,
                    data: null,
                };
            }
            vcaReport = vcaReport.get({ plain: true });
            const unitsMasterList = await models.unitsMaster.findAll({
                where: { status: DELETE_STATUS.ACTIVE },
                attributes: models.unitsMaster.selectedFields,
            });
            const vcaCommodityDetails = vcaReport.vcaCommodityDetails.reduce((res, curr) => {
                let { key, ...item } = curr;
                res[key] = item;
                res[key].unitId = unitsMasterList.find(
                    ({ value }) => item.unitId && value === item.unitId.value
                );
                return res;
            }, {});

            const result = { ...vcaReport, ...vcaCommodityDetails };
            delete result["vcaCommodityDetails"];
            return { code: errorCodes.HTTP_OK, message: messages.success, data: result };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async submitVcaCommentService(params) {
        try {
            const { userData, reportId } = params;
            const role = userData.roleId;
            const userId = userData.userId;
            const reportData = await models.vcaReportView.findOne({
                where: { reportId },
                attributes: models.vcaReportView.selectedFields,
                raw: true,
            });
            const commentUsers = await models.permissionView.findAll({
                where: {
                    actionKey: ACTION.COMMENT,
                    isPermission: true,
                    moduleId: userData.moduleId,
                },
                attributes: ["groupName", "roleId", "roleName"],
                raw: true,
            });
            let roles = [];
            let locationCondition = {};
            if (params.replyCommentId) {
                const commentData = await models.vcaComments.findOne({
                    where: { commentId: params.replyCommentId },
                    attributes: models.vcaComments.selectedFields,
                    raw: true,
                });
                if (commentData.role == role) {
                    return { code: errorCodes.HTTP_CONFLICT, message: messages.noReplyToYours };
                }
                const isCommentState = commentUsers.find(
                    (x) => x.roleId == commentData.role && x.groupName == "SPMU"
                );
                if (!isCommentState) {
                    locationCondition = { districtId: reportData.districtId };
                }
                roles.push(commentData.role);
            } else {
                const isStateUser = commentUsers.find(
                    (x) => x.roleId == role && x.groupName == "SPMU"
                );
                if (isStateUser) {
                    roles = commentUsers
                        .filter((x) => x.roleId != isStateUser.roleId)
                        .reduce((res, curr) => [...res, curr.roleId], []);
                } else {
                    roles = commentUsers
                        .filter((x) => x.groupName != "SPMU" && x.roleId != role)
                        .reduce((res, curr) => [...res, curr.roleId], []);
                    locationCondition = { districtId: reportData.districtId };
                }
            }
            await models.vcaComments.create(
                { ...params, role, VCA23_CREATED_D: userId, VCA23_UPDATED_D: userId },
                {
                    include: { model: models.vcaCommentDocument, as: "vcaCommentDocument" },
                }
            );
            await models.vcaCommentsRead.update(
                { lastReadAt: models.sequelize.literal("CURRENT_TIMESTAMP") },
                { where: { reportId, role } }
            );
            const toUserDetails = await models.staffMasterView.findAll({
                where: {
                    roleId: roles,
                    status: STAFF_STATUS.ACTIVE,
                    isDeleted: IS_DELETED.NOT_DELETED,
                },
                attributes: models.staffMasterView.selectedFields,
                include: {
                    model: models.staffAddressView,
                    where: { ...locationCondition },
                    as: "staffAddressView",
                    attributes: [],
                    required: locationCondition.districtId ? true : false,
                },
                raw: true,
            });
            const notifyUsers = toUserDetails.reduce(
                (res, curr) => [
                    ...res,
                    {
                        fromUser: userData,
                        data: {
                            comment: params.comment,
                            reportId,
                            reportTitle: reportData.documentTitle,
                        },
                        msgType: params.replyCommentId
                            ? MESSAGE_TYPE.REPLY_COMMENT
                            : MESSAGE_TYPE.COMMENT,
                        toUser: curr,
                    },
                ],
                []
            );
            await notification.sendNotification(notifyUsers);
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async deleteVcaCommentService(params) {
        try {
            const { userData, reportId, commentId } = params;
            const role = userData.roleId;
            const commentData = await models.vcaComments.findOne({
                where: { commentId, reportId },
                raw: true,
            });
            if (!commentData)
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.commentNotFound };
            if (commentData.role != role) {
                return { code: errorCodes.HTTP_BAD_REQUEST, message: messages.otherComment };
            }
            const isReplied = await models.vcaComments.findOne({
                where: { replyCommentId: commentId, reportId, status: DELETE_STATUS.ACTIVE },
                raw: true,
            });
            if (isReplied) {
                return {
                    code: errorCodes.HTTP_BAD_REQUEST,
                    message: messages.replyCommentNotDelete,
                };
            }
            await models.vcaComments.update(
                { status: DELETE_STATUS.INACTIVE },
                { where: { commentId, reportId } }
            );
            return { code: errorCodes.HTTP_OK, message: messages.commentDeleted };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getVcaCommentsService(params) {
        try {
            const { reportId, showAll, userData } = params;
            const limitCondition = showAll == "true" ? {} : { limit: 10 };
            const role = userData.roleId;
            const commentStaffs = await models.permissionView.findAll({
                where: {
                    moduleId: userData.moduleId,
                    actionKey: ACTION.COMMENT,
                    isPermission: true,
                },
                attributes: ["roleId", "roleName"],
                raw: true,
            });
            let comments = await models.vcaComments.findAll({
                where: { reportId, status: DELETE_STATUS.ACTIVE },
                attributes: [
                    ...models.vcaComments.selectedFields,
                    [models.sequelize.literal("staffMasterView.TNRTP06_USER_NAME_N"), "userName"],
                ],
                include: [
                    {
                        model: models.vcaCommentDocument,
                        as: "vcaCommentDocument",
                        attributes: models.vcaCommentDocument.selectedFields,
                        required: false,
                    },
                    {
                        model: models.staffMasterView,
                        as: "staffMasterView",
                        attributes: [],
                        required: false,
                    },
                ],
                ...limitCondition,
                subQuery: false,
                order: [["VCA23_CREATED_AT", "DESC"]],
            });
            let lastReadData = await models.vcaCommentsRead.findOne({
                where: { reportId, role },
                attributes: models.vcaCommentsRead.selectedFields,
                raw: true,
            });
            if (lastReadData) {
                await models.vcaCommentsRead.update(
                    { lastReadAt: models.sequelize.literal("CURRENT_TIMESTAMP") },
                    { where: { reportId, role } }
                );
            } else {
                lastReadData = await models.vcaCommentsRead.create({ reportId, role });
                lastReadData = lastReadData.get({ plain: true });
            }
            if (comments) {
                comments = comments.reduce(
                    (result, curr) => [...result, curr.get({ plain: true })],
                    []
                );
                const nest = (items = [], commentId = null) =>
                    items
                        .filter((item) => item["replyCommentId"] === commentId)
                        .map((item) => ({
                            ...item,
                            roleName: commentStaffs.find((y) => y.roleId == item.role)
                                ? commentStaffs.find((y) => y.roleId == item.role).roleName
                                : null,
                            replyComment: nest(items, item.commentId),
                        }));
                comments = nest(comments);
            }
            return { code: errorCodes.HTTP_OK, message: messages.success, data: comments };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getVcaActivitiesService(params) {
        try {
            const { activityId, commodityId } = params;
            const reportList = await models.vcaReportView.findAll({
                where: {
                    activityId,
                    commodityId,
                    applicationStatus: { [Op.ne]: VCA_REPORT_STATUS.DRAFT },
                },
                attributes: ["reportId", "documentTitle", "applicationStatus", "version"],
                raw: true,
            });
            const activities = await models.vcaActivityView.findAll({
                where: { reportId: reportList.map((x) => x.reportId) },
                attributes: models.vcaActivityView.selectedFields,
                raw: true,
            });
            reportList.map((x) => {
                x.vcaActivities = activities
                    .filter((y) => (x.reportId = y.reportId))
                    .sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });
            });
            return { code: errorCodes.HTTP_OK, message: messages.success, data: reportList };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getSingedUrlService(params) {
        try {
            const { fileKeys } = params;
            const signedUrls = [];
            if (fileKeys && fileKeys.length) {
                for (let i = 0; i < fileKeys.length; i++) {
                    const url = s3.getSignedUrl("getObject", {
                        Bucket: process.env.S3_BUCKET,
                        Key: fileKeys[i],
                        Expires: 60,
                    });
                    signedUrls.push(url);
                }
            }
            return { code: errorCodes.HTTP_OK, message: messages.success, data: signedUrls };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
}
module.exports = new VcaReportService();

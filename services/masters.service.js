const models = require("../models");
const messages = require("./../config/errorMsgs.js");
const errorCodes = require("./../config/errorCodes.js");
const { DELETE_STATUS } = require("../constants");
const { sequelize } = models;

class MastersService {} //

MastersService.prototype.getDistrictListSerivce = async (params) => {
    try {
        const { isTNRTP } = params;
        let isTNRTPCondition = isTNRTP ? { isTNRTP: true } : {};

        const rows = await models.districtMasterView.findAll({
            where: { status: DELETE_STATUS.ACTIVE, ...isTNRTPCondition },
            order: [["TNRTP07_DISTRICT_NAME", "ASC"]],
            attributes: models.districtMasterView.selectedFields,
        });
        return { code: errorCodes.HTTP_OK, message: messages.listSuccess, data: rows };
    } catch (err) {
        return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
    }
};

MastersService.prototype.getCountryListSerivce = async () => {
    try {
        const rows = await models.countryMaster.findAll({
            where: { status: DELETE_STATUS.ACTIVE },
            attributes: models.countryMaster.selectedFields,
        });
        return { code: errorCodes.HTTP_OK, message: messages.listSuccess, data: rows };
    } catch (err) {
        return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
    }
};

MastersService.prototype.getStateListSerivce = async () => {
    try {
        const rows = await models.stateMaster.findAll({
            where: { status: DELETE_STATUS.ACTIVE },
            attributes: models.stateMaster.selectedFields,
        });
        return { code: errorCodes.HTTP_OK, message: messages.listSuccess, data: rows };
    } catch (err) {
        return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
    }
};

MastersService.prototype.getUnitsListSerivce = async (params) => {
    try {
        const { reportType } = params;
        let rows = await models.unitsMaster.findAll({
            where: { status: DELETE_STATUS.ACTIVE },
            attributes: models.unitsMaster.selectedFields,
        });
        rows = rows
            .map((x) => x.get({ plain: true }))
            .filter((element) => element.reportType.some((subElement) => subElement == reportType))
            .map(({ value, label, description }) => ({ value, label, description }));

        return { code: errorCodes.HTTP_OK, message: messages.listSuccess, data: rows };
    } catch (err) {
        return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
    }
};

MastersService.prototype.getStageListSerivce = async () => {
    try {
        const rows = await models.stageMaster.findAll({
            where: { status: DELETE_STATUS.ACTIVE },
            attributes: models.stageMaster.selectedFields,
        });
        return { code: errorCodes.HTTP_OK, message: messages.listSuccess, data: rows };
    } catch (err) {
        return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
    }
};

MastersService.prototype.getChannelListSerivce = async () => {
    try {
        const rows = await models.channelMaster.findAll({
            where: { status: DELETE_STATUS.ACTIVE },
            attributes: models.channelMaster.selectedFields,
        });
        return { code: errorCodes.HTTP_OK, message: messages.listSuccess, data: rows };
    } catch (err) {
        return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
    }
};

MastersService.prototype.getActivityListSerivce = async () => {
    try {
        const rows = await models.activityMaster.findAll({
            where: { status: DELETE_STATUS.ACTIVE },
            include: {
                model: models.commodityMaster,
                as: "commodityMaster",
                where: { isReport: true },
                attributes: [],
                required: false,
            },
            attributes: [
                ...models.activityMaster.selectedFields,
                [sequelize.col("commodityMaster.VCA02_COMMODITY_MASTER_D"), "commodityId"],
                [sequelize.col("commodityMaster.VCA02_COMMODITY_NAME_N"), "commodityName"],
                [
                    sequelize.literal(
                        "IFNULL(commodityMaster.VCA02_REPORT_TYPE_N, VCA01_REPORT_TYPE_N)"
                    ),
                    "reportType",
                ],
            ],
            group: [["commodityMaster.VCA02_COMMODITY_MASTER_D"]],
            order: [["VCA01_ACTIVITY_MASTER_D", "ASC"]],
        });
        return { code: errorCodes.HTTP_OK, message: messages.listSuccess, data: rows };
    } catch (err) {
        return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
    }
};

MastersService.prototype.getCommodityListSerivce = async (params) => {
    try {
        const { activityId } = params;
        const rows = await models.commodityMaster.findAll({
            where: { status: DELETE_STATUS.ACTIVE, activityId },
            include: { model: models.vcaReport, as: "vcaReport", required: false, attributes: [] },
            attributes: [
                ...models.commodityMaster.selectedFields,
                [
                    models.sequelize.literal(
                        "CASE WHEN vcaReport.VCA02_COMMODITY_MASTER_D IS NOT NULL THEN 1 ELSE 0 END"
                    ),
                    "isCommodityUsed",
                ],
            ],
        });
        return { code: errorCodes.HTTP_OK, message: messages.listSuccess, data: rows };
    } catch (err) {
        return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
    }
};

module.exports = new MastersService();

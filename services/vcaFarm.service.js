const models = require("../models");
const messages = require("../config/errorMsgs.js");
const errorCodes = require("../config/errorCodes.js");
const { VCA_REPORT_STATUS, DELETE_STATUS, VCA_FARM_STAGE } = require("../constants");
const { Op } = require("sequelize");
class FarmService {
    async vcaFarmOverviewSerivce(params) {
        try {
            params.commodityId = params.commodityId ? params.commodityId.value : null;
            const { commodityId, reportId, applicationStatus, userData } = params;
            const isCommodityExists = await models.vcaReport.findOne({
                where: {
                    applicationStatus: [
                        VCA_REPORT_STATUS.DRAFT,
                        VCA_REPORT_STATUS.IN_PROGRESS,
                        VCA_REPORT_STATUS.REVIEWED,
                    ],
                    reportId: { [Op.ne]: reportId },
                    commodityId,
                    status: DELETE_STATUS.ACTIVE,
                },
                raw: true,
            });
            if (isCommodityExists && commodityId) {
                return { code: errorCodes.HTTP_CONFLICT, message: messages.vcaReportPending };
            }
            await models.vcaOverview.destroy({ where: { reportId } });
            await models.vcaReport.update({ commodityId }, { where: { reportId } });
            await models.vcaOverview.create({ ...params });
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
    async vcaFarmGeographySerivce(params) {
        try {
            const { reportId, applicationStatus, userData } = params;
            await models.vcaGeography.destroy({ where: { reportId } });
            await models.vcaGeography.create({ ...params });
            if (applicationStatus == VCA_REPORT_STATUS.IN_PROGRESS) {
                await models.vcaEditActivity.create({
                    reportId,
                    section: VCA_FARM_STAGE.GEOGRAPHY.LABEL,
                    VCA26_CREATED_D: userData.userId,
                    VCA26_UPDATED_D: userData.userId,
                });
            }
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async vcaFarmDistrictsCoveredSerivce(params) {
        try {
            const { reportId, applicationStatus, userData } = params;
            await models.vcaDistrictsCovered.destroy({ where: { reportId } });
            await models.vcaDistrictsCovered.create({ ...params });
            if (applicationStatus == VCA_REPORT_STATUS.IN_PROGRESS) {
                await models.vcaEditActivity.create({
                    reportId,
                    section: VCA_FARM_STAGE.DISTRICTS_COVERED.LABEL,
                    VCA26_CREATED_D: userData.userId,
                    VCA26_UPDATED_D: userData.userId,
                });
            }
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async vcaFarmCommodityDetailsSerivce(params) {
        try {
            const { reportId, isFilled, applicationStatus, userData, ...restData } = params;
            const reqBody = Object.keys(restData).reduce((res, curr) => {
                let eachObj = { ...restData[curr], key: curr, reportId, isFilled };
                return [...res, eachObj];
            }, []);
            await models.vcaCommodityDetails.destroy({ where: { reportId } });
            await models.vcaCommodityDetails.bulkCreate([...reqBody]);
            if (applicationStatus == VCA_REPORT_STATUS.IN_PROGRESS) {
                await models.vcaEditActivity.create({
                    reportId,
                    section: VCA_FARM_STAGE.COMMODITY_DETAILS.LABEL,
                    VCA26_CREATED_D: userData.userId,
                    VCA26_UPDATED_D: userData.userId,
                });
            }
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async vcaFarmActivitiesSerivce(params) {
        try {
            const { reportId, applicationStatus, userData } = params;
            if (params.vcaMajorResource) {
                params.vcaMajorResource = Object.keys(params.vcaMajorResource).reduce(
                    (res, curr) => {
                        if (params.vcaMajorResource[curr] && params.vcaMajorResource[curr].length) {
                            params.vcaMajorResource[curr].map((x) => {
                                x.key = curr;
                            });
                        }
                        return [...res, ...params.vcaMajorResource[curr]];
                    },
                    []
                );
            }
            await models.vcaActivities.destroy({ where: { reportId } });
            await models.vcaActivities.create(
                { ...params },
                {
                    include: [
                        { model: models.vcaActors, as: "vcaActors" },
                        { model: models.vcaChannelActors, as: "vcaChannelActors" },
                        { model: models.vcaProposedValueChain, as: "vcaProposedValueChain" },
                        { model: models.vcaIntervention, as: "vcaIntervention" },
                        { model: models.vcaMajorResource, as: "vcaMajorResource" },
                        { model: models.vcaLinkages, as: "vcaLinkages" },
                    ],
                }
            );
            if (applicationStatus == VCA_REPORT_STATUS.IN_PROGRESS) {
                await models.vcaEditActivity.create({
                    reportId,
                    section: VCA_FARM_STAGE.ACTIVITES.LABEL,
                    VCA26_CREATED_D: userData.userId,
                    VCA26_UPDATED_D: userData.userId,
                });
            }
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getVcaFarmReportByIdSerivce(params) {
        try {
            const { reportId } = params;
            let vcaReport = await models.vcaReport.findOne({
                where: { status: DELETE_STATUS.ACTIVE, reportId },
                attributes: [
                    ...models.vcaReport.selectedFields,
                    [models.sequelize.literal("vcaReportView.sectionsFilled"), "sectionsFilled"],
                ],
                include: [
                    {
                        model: models.vcaOverview,
                        as: "vcaOverview",
                        attributes: models.vcaOverview.selectedFields,
                        required: false,
                        include: [
                            {
                                model: models.commodityMaster,
                                as: "commodityMaster",
                                attributes: models.commodityMaster.selectedFields,
                                required: false,
                            },
                        ],
                    },
                    {
                        model: models.vcaGeography,
                        as: "vcaGeography",
                        attributes: models.vcaGeography.vcaFarmGeographyFields,
                        required: false,
                        include: [
                            {
                                model: models.countryMaster,
                                as: "countryMaster",
                                attributes: models.countryMaster.selectedFields,
                                required: false,
                            },
                            {
                                model: models.stateMaster,
                                as: "stateMaster",
                                attributes: models.stateMaster.selectedFields,
                                required: false,
                            },
                            {
                                model: models.districtMasterView,
                                as: "districtMasterView",
                                attributes: models.districtMasterView.selectedFields,
                                required: false,
                            },
                        ],
                    },
                    {
                        model: models.vcaDistrictsCovered,
                        as: "vcaDistrictsCovered",
                        attributes: models.vcaDistrictsCovered.vcaFarmDistrictsCoveredFields,
                        required: false,
                    },
                    {
                        model: models.vcaCommodityDetails,
                        as: "vcaCommodityDetails",
                        attributes: models.vcaCommodityDetails.vcaFarmCommodityDetailsFields,
                        required: false,
                    },
                    {
                        model: models.vcaGroupDetails,
                        as: "vcaGroupDetails",
                        attributes: models.vcaGroupDetails.commonFields,
                        required: false,
                    },
                    {
                        model: models.vcaActivities,
                        as: "vcaActivities",
                        attributes: models.vcaActivities.vcaFarmActivitiesFields,
                        required: false,
                        include: [
                            {
                                model: models.vcaActors,
                                as: "vcaActors",
                                attributes: models.vcaActors.vcaFarmActorsFields,
                                required: false,
                            },
                            {
                                model: models.vcaChannelActors,
                                as: "vcaChannelActors",
                                attributes: models.vcaChannelActors.vcaFarmChannelActorsFields,
                                required: false,
                            },
                            {
                                model: models.vcaProposedValueChain,
                                as: "vcaProposedValueChain",
                                attributes:
                                    models.vcaProposedValueChain.vcaFarmProposedValueChainFields,
                                required: false,
                            },
                            {
                                model: models.vcaIntervention,
                                as: "vcaIntervention",
                                attributes: models.vcaIntervention.vcaFarmInterventionFields,
                                required: false,
                                include: [
                                    {
                                        model: models.stageMaster,
                                        as: "stageMaster",
                                        attributes: models.stageMaster.selectedFields,
                                        required: false,
                                    },
                                ],
                            },
                            {
                                model: models.vcaMajorResource,
                                as: "vcaMajorResource",
                                attributes: models.vcaMajorResource.vcaFarmMajorResourceFields,
                                required: false,
                            },
                            {
                                model: models.vcaLinkages,
                                as: "vcaLinkages",
                                attributes: models.vcaLinkages.vcaFarmLinkagesFields,
                                required: false,
                            },
                        ],
                    },
                    {
                        model: models.vcaSwotAnalysis,
                        as: "vcaSwotAnalysis",
                        attributes: models.vcaSwotAnalysis.commonFields,
                        required: false,
                    },
                    {
                        model: models.vcaDocUpload,
                        as: "vcaDocUpload",
                        attributes: models.vcaDocUpload.commonFields,
                        required: false,
                    },
                    {
                        model: models.vcaReportView,
                        as: "vcaReportView",
                        attributes: [],
                        required: false,
                    },
                ],
            });
            vcaReport = vcaReport.get({ plain: true });
            vcaReport.sectionsFilled = vcaReport.sectionsFilled
                ? vcaReport.sectionsFilled.split(",")
                : [];
            const vcaMajorResource = vcaReport.vcaActivities
                ? vcaReport.vcaActivities.vcaMajorResource.reduce((res, curr) => {
                      let { key, ...item } = curr;
                      res[key] = res[key] ? [...res[key], item] : [item];
                      return res;
                  }, {})
                : null;

            const vcaActivities = vcaMajorResource
                ? { ...vcaReport.vcaActivities, vcaMajorResource }
                : null;

            const unitsMasterList = await models.unitsMaster.findAll({
                where: { status: DELETE_STATUS.ACTIVE },
                attributes: models.unitsMaster.selectedFields,
            });

            const vcaCommodityDetails = vcaReport.vcaCommodityDetails.length
                ? vcaReport.vcaCommodityDetails.reduce((res, curr) => {
                      let { key, ...item } = curr;
                      res[key] = item;
                      res[key].unitId = unitsMasterList.find(
                          ({ value }) => item.unitId && value === item.unitId.value
                      );
                      return res;
                  }, {})
                : null;

            const vcaGeography = vcaReport.vcaGeography
                ? {
                      ...vcaReport.vcaGeography,
                      countryCultivationAreaUnit: unitsMasterList.find(
                          ({ value }) => value === vcaReport.vcaGeography.countryCultivationAreaUnit
                      ),
                      countryProductionVolumeUnit: unitsMasterList.find(
                          ({ value }) =>
                              value === vcaReport.vcaGeography.countryProductionVolumeUnit
                      ),
                      stateCultivationAreaUnit: unitsMasterList.find(
                          ({ value }) => value === vcaReport.vcaGeography.stateCultivationAreaUnit
                      ),
                      stateProductionVolumeUnit: unitsMasterList.find(
                          ({ value }) => value === vcaReport.vcaGeography.stateProductionVolumeUnit
                      ),
                      districtCultivationAreaUnit: unitsMasterList.find(
                          ({ value }) =>
                              value === vcaReport.vcaGeography.districtCultivationAreaUnit
                      ),
                      districtProductionVolumeUnit: unitsMasterList.find(
                          ({ value }) =>
                              value === vcaReport.vcaGeography.districtProductionVolumeUnit
                      ),
                  }
                : null;

            const vcaReportResult = {
                ...vcaReport,
                vcaGeography,
                vcaActivities,
                vcaCommodityDetails,
            };
            return { code: errorCodes.HTTP_OK, message: messages.success, data: vcaReportResult };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
}
module.exports = new FarmService();

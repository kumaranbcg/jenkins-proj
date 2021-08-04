const app = require("../../app");
const request = require("supertest")(app);
const models = require("../../models");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.AES_KEY);
const errorCodes = require("../../config/errorCodes");
const errorMessages = require("../../config/errorMsgs");
const {
    VCA_FARM_STAGE,
    DELETE_STATUS,
    VCA_REPORT_STATUS,
    COMMODITY_IDS,
} = require("../../constants");
const {
    vcaFarmReportData,
    alreadyApprovedData,
    unknownCommodityData,
    draftData,
    unknownReportData,
    hardData
} = require("./../sampleData");
const _ = require("lodash");
let token = null;
module.exports = (authorization) => {
    describe("Login as Admin", () => {
        it("Logging with Admin", async () => {
            const userData = await models.staffMasterView.findOne({
                where: { userName: "Administrator" },
                attributes: models.staffMasterView.selectedFields,
                raw: true,
            });
            const encryptedData = {
                userId: cryptr.encrypt(userData.userId),
                groupId: cryptr.encrypt(userData.groupId),
                roleId: cryptr.encrypt(userData.roleId),
                role: cryptr.encrypt(userData.role),
                loggedIn: cryptr.encrypt(userData.loggedIn),
            };
            token = jwt.sign({ ...encryptedData }, process.env.JWT_SECRET);
            expect(1).toBe(1);
        });
    });
    describe("GET /vca/v1/api/vcaReport/createVcaReport", () => {
        it("Create VCA Farm Report", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/createVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ activityId: COMMODITY_IDS.FARM, commodityId: null });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.reportCreated);
        });
        it("Check already raised VCA Report", async () => {
            await models.vcaReport.update(
                { status: DELETE_STATUS.ACTIVE },
                { where: { reportId: draftData.reportId } }
            );
            const res = await request
                .get("/vca/v1/api/vcaReport/createVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ activityId: 2, commodityId: COMMODITY_IDS.OFF_FARM_FISHERIES });
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.vcaReportPending);
        });
        it("Should throw error on invalid commodity Id", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/createVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ activityId: 2, commodityId: 999 });
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
            expect(res.body.message).toBe(errorMessages.validActivityReq);
        });
        it("Should throw error on activity Id not passed", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/createVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ commodityId: 999 });
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("POST /vca/v1/api/vcaReport/fillVcaReport", () => {
        it("Fill Overview stage", async () => {
            await models.vcaReport.update(
                { applicationStatus: VCA_REPORT_STATUS.IN_PROGRESS },
                { where: { reportId: vcaFarmReportData.vcaOverview.reportId } }
            );
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.OVERVIEW.VALUE, isFilled: true })
                .send(vcaFarmReportData.vcaOverview);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Should throw error if commodity already selected by another report", async () => {
            const alreadySelectedComm = _.cloneDeep(vcaFarmReportData.vcaOverview);
            alreadySelectedComm.commodityId.value = COMMODITY_IDS.OFF_FARM_FISHERIES;
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.OVERVIEW.VALUE, isFilled: true })
                .send(alreadySelectedComm);
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.vcaReportPending);
        });
        it("Fill Commodity Geography stage", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.GEOGRAPHY.VALUE, isFilled: true })
                .send(vcaFarmReportData.vcaGeography);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Fill Commodity Geography stage without masters", async () => {
            const vcaGeoWithoutMasters = _.cloneDeep(vcaFarmReportData.vcaGeography);
            vcaGeoWithoutMasters.countryId = null;
            vcaGeoWithoutMasters.countryCultivationAreaUnit = null;
            vcaGeoWithoutMasters.countryProductionVolumeUnit = null;
            vcaGeoWithoutMasters.stateId = null;
            vcaGeoWithoutMasters.stateCultivationAreaUnit = null;
            vcaGeoWithoutMasters.stateProductionVolumeUnit = null;
            vcaGeoWithoutMasters.districtId = null;
            vcaGeoWithoutMasters.districtCultivationAreaUnit = null;
            vcaGeoWithoutMasters.districtProductionVolumeUnit = null;
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.GEOGRAPHY.VALUE, isFilled: true })
                .send(vcaGeoWithoutMasters);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Fill Districts Covered stage", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.DISTRICTS_COVERED.VALUE, isFilled: true })
                .send(vcaFarmReportData.vcaDistrictsCovered);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Fill Commodity Details stage", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.COMMODITY_DETAILS.VALUE, isFilled: true })
                .send(vcaFarmReportData.vcaCommodityDetails);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Fill Group Details stage", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.GROUP_DETAILS.VALUE, isFilled: true })
                .send(vcaFarmReportData.vcaGroupDetails);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Fill VCA Activities stage", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.ACTIVITES.VALUE, isFilled: true })
                .send(vcaFarmReportData.vcaActivities);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Fill SWOT Analysis stage", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.SWOT_ANALYSIS.VALUE, isFilled: true })
                .send(vcaFarmReportData.vcaSwotAnalysis);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Fill Upload Document stage", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: VCA_FARM_STAGE.DOC_UPLOAD.VALUE, isFilled: true })
                .send(vcaFarmReportData.vcaDocUpload);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Should throw error if invalid stage number given", async () => {
            const alreadySelectedComm = _.cloneDeep(vcaFarmReportData.vcaOverview);
            alreadySelectedComm.commodityId = 2;
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: 100, isFilled: true })
                .send(alreadySelectedComm);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
            expect(res.body.message).toBe(errorMessages.stageReq);
        });
        it("Should throw error if report already submitted", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: 1, isFilled: true })
                .send(alreadyApprovedData);
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.reportCannotEdited);
        });
        it("Should throw error on unknown commodityId", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/fillVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ stage: 1, isFilled: true })
                .send(unknownCommodityData);
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
    });
    describe("GET /vca/v1/api/vcaReport/getVcaReportById", () => {
        it("Get vca report by Id", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaReportById")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: vcaFarmReportData.vcaOverview.reportId })
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Should throw error when report not found", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaReportById")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: unknownReportData.reportId })
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
        it("Should throw error when report Id not present", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaReportById")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: hardData.reportId })
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
        it("Should throw error when report Id is not passed", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaReportById")
                .set("token", token)
                .set("authorization", authorization)
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
};

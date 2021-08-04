const app = require("../../app");
const request = require("supertest")(app);
const errorCodes = require("../../config/errorCodes");
const errorMessages = require("../../config/errorMsgs");
const models = require("../../models");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.AES_KEY);
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
    // describe("GET /ydb/v1/api/masters/getDistrictList", () => {
    //     it("Get all districts", async () => {
    //         const res = await request
    //             .get("/ydb/v1/api/masters/getDistrictList")
    //             .set("token", token)
    //             .set("authorization", authorization);
    //         expect(res.statusCode).toBe(errorCodes.HTTP_OK);
    //         expect(res.body.message).toBe(errorMessages.listSuccess);
    //     });
    //     it("Get only TNRTP districts", async () => {
    //         const res = await request
    //             .get("/ydb/v1/api/masters/getDistrictList")
    //             .query({ isTNRTP: false })
    //             .set("token", token)
    //             .set("authorization", authorization);
    //         expect(res.statusCode).toBe(errorCodes.HTTP_OK);
    //         expect(res.body.message).toBe(errorMessages.listSuccess);
    //     });
    // });
    describe("GET /vca/v1/api/masters/getDistrictList", () => {
        it("Get all districts", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getDistrictList")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.listSuccess);
        });
        it("Get only TNRTP districts", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getDistrictList")
                .query({ isTNRTP: false })
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.listSuccess);
        });
    });
    describe("GET /vca/v1/api/masters/getCountryList", () => {
        it("Get all countries", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getCountryList")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.listSuccess);
        });
    });
    describe("GET /vca/v1/api/masters/getStateList", () => {
        it("Get all states", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getStateList")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.listSuccess);
        });
    });
    describe("GET /vca/v1/api/masters/getUnitsList", () => {
        it("Get all units", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getUnitsList")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportType: "farm" });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.listSuccess);
        });
        it("Should throw error on missing required fields", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getUnitsList")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("GET /vca/v1/api/masters/getStageList", () => {
        it("Get all stages", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getStageList")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.listSuccess);
        });
    });
    describe("GET /vca/v1/api/masters/getChannelList", () => {
        it("Get all channels", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getChannelList")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.listSuccess);
        });
    });
    describe("GET /vca/v1/api/masters/getActivityList", () => {
        it("Get all activity", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getActivityList")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.listSuccess);
        });
    });
    describe("GET /ydb/v1/api/masters/getCommodityList", () => {
        it("Get all Commodity", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getCommodityList")
                .query({ activityId: 1 })
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.listSuccess);
        });
        it("Get all Commodity without activity ID", async () => {
            const res = await request
                .get("/vca/v1/api/masters/getCommodityList")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
};

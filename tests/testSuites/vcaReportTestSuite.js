const app = require("../../app");
const request = require("supertest")(app);
const models = require("../../models");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.AES_KEY);
const errorCodes = require("../../config/errorCodes");
const errorMessages = require("../../config/errorMsgs");
const {
    draftData,
    commentsData,
    alreadyApprovedData,
    alreadyDeletedData,
    unknownReportData,
    hardData,
    vcaFarmReportData,
} = require("../sampleData");
const fs = require("fs");
const _ = require("lodash");
const { VCA_REPORT_STATUS, DELETE_STATUS } = require("../../constants");
let token = null,
    imageName = null,
    spmuToken = null;

module.exports = (authorization) => {
    describe("Login as Admin", () => {
        it("Logging with Admin", async () => {
            const userData = await models.staffMasterView.findOne({
                where: { userName: "Administrator" },
                attributes: models.staffMasterView.selectedFields,
                raw: true,
            });
            const spmuUserData = await models.staffMasterView.findOne({
                where: { userName: "SPMU" },
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
            const smpuEncryptedData = {
                userId: cryptr.encrypt(spmuUserData.userId),
                groupId: cryptr.encrypt(spmuUserData.groupId),
                roleId: cryptr.encrypt(spmuUserData.roleId),
                role: cryptr.encrypt(spmuUserData.role),
                loggedIn: cryptr.encrypt(spmuUserData.loggedIn),
            };
            token = jwt.sign({ ...encryptedData }, process.env.JWT_SECRET);
            spmuToken = jwt.sign({ ...smpuEncryptedData }, process.env.JWT_SECRET);
            expect(1).toBe(1);
        });
    });
    describe("DELETE /vca/v1/api/vcaReport/deleteVcaReport", () => {
        it("Delete VCA Report", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: draftData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.reportDeleted);
        });
        it("Deleting aleardy deleted VCA Report should throw error", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: alreadyDeletedData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.alreadyDeleted);
        });
        it("Deleting unknown VCA Report should throw error", async () => {
            const res = await request
                .delete("/vca/v1/api/VCAReport/deleteVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: unknownReportData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
        it("Deleting approved VCA Report should throw error", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: alreadyApprovedData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.reportCannotDeleted);
        });
        it("Should throw error when reportid not passed", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaReport")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("DELETE /vca/v1/api/vcaReport/hardDeleteVcaReport", () => {
        it("Hard Delete VCA Report", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/hardDeleteVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .send({ reportId: hardData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.reportDeleted);
        });
        it("Should throw error when reportid not passed", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/hardDeleteVcaReport")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("GET /vca/v1/api/vcaReport/getVcaReports", () => {
        it("Get VCA reports", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaReports")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
    });
    describe("GET /vca/v1/api/vcaReport/getVcaReportLists", () => {
        it("Get VCA reports", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaReportLists")
                .set("token", token)
                .set("authorization", authorization)
                .query({ search: "", page: 1, limit: 10 });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Should throw error when params not pased", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaReportLists")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("POST /vca/v1/api/vcaReport/uploadDoc", () => {
        it("Upload Image", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/uploadDoc")
                .set("token", token)
                .set("authorization", authorization)
                .attach("image", fs.readFileSync("./public/asserts/flow.png"), "tests/file.png");
            imageName = res.body.data[0].url;
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
    });
    describe("POST /vca/v1/api/vcaReport/getSingedUrl", () => {
        it("Get singed url", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/getSingedUrl")
                .set("token", token)
                .set("authorization", authorization)
                .send({ fileKeys: [imageName] });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Get singed url without file name shoukd throw error", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/getSingedUrl")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("GET /vca/v1/api/vcaReport/submitVcaReport", () => {
        it("Review and Submit VCA Report", async () => {
            await models.vcaReport.update(
                { applicationStatus: VCA_REPORT_STATUS.DRAFT },
                { where: { reportId: vcaFarmReportData.vcaOverview.reportId } }
            );
            const res = await request
                .get("/vca/v1/api/vcaReport/submitVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: vcaFarmReportData.vcaOverview.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.reportSubmited);
        });
        it("Submitting not filled VCA Report should throw error", async () => {
            await models.vcaReport.update(
                { status: DELETE_STATUS.ACTIVE },
                { where: { reportId: draftData.reportId } }
            );
            const res = await request
                .get("/vca/v1/api/vcaReport/submitVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: draftData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.notFilled);
        });
        it("Submitting unknown VCA Report should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/submitVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: unknownReportData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
        it("Submitting already deleted VCA Report should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/submitVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: alreadyDeletedData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.alreadyDeleted);
        });
        it("Submitting already approved VCA Report should throw error", async () => {
            const data = _.cloneDeep(vcaFarmReportData);
            data.vcaOverview.reportId = alreadyApprovedData.reportId;
            const res = await request
                .get("/vca/v1/api/vcaReport/submitVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: data.vcaOverview.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.reportCannotEdited);
        });
        it("Submitting without Report id should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/submitVcaReport")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("GET /vca/v1/api/vcaReport/reviewVcaReport", () => {
        it("Review VCA Report", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/reviewVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: vcaFarmReportData.vcaOverview.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.reviewed);
        });
        it("Reviewing unknown VCA Report should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/reviewVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: unknownReportData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
        it("Reviewing already deleted VCA Report should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/reviewVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: alreadyDeletedData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.alreadyDeleted);
        });
        it("Reviewing already reviewed VCA Report should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/reviewVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: vcaFarmReportData.vcaOverview.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.reportAlreadyReviewed);
        });
        it("should throw error with missing required fields", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/reviewVcaReport")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("GET /vca/v1/api/vcaReport/approveVcaReport", () => {
        it("Approve VCA Report", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/approveVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: vcaFarmReportData.vcaOverview.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.approved);
        });
        it("Approving unknown VCA Report should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/approveVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: unknownReportData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
        it("Approving already deleted VCA Report should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/approveVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: alreadyDeletedData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.alreadyDeleted);
        });
        it("Approving already approved VCA Report should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/approveVcaReport")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: vcaFarmReportData.vcaOverview.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.reportAlreadyApproved);
        });
        it("should throw error with missing required fields", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/approveVcaReport")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("POST /vca/v1/api/vcaReport/submitVcaComment", () => {
        it("Submit comments to VCA Report", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/submitVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .send(commentsData);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Submit comments to VCA Report by SPMU", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/submitVcaComment")
                .set("token", spmuToken)
                .set("authorization", authorization)
                .send(commentsData);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Submit reply comment to VCA Report", async () => {
            await models.vcaComments.update(
                { role: 28 },
                { where: { reportId: commentsData.reportId } }
            );
            const replyCommentData = _.cloneDeep(commentsData);
            replyCommentData.replyCommentId = 1;
            const res = await request
                .post("/vca/v1/api/vcaReport/submitVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .send(replyCommentData);
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Submit reply comment to your own comment should throw error", async () => {
            await models.vcaComments.update(
                { role: 1 },
                { where: { reportId: commentsData.reportId } }
            );
            const replyCommentData = _.cloneDeep(commentsData);
            replyCommentData.replyCommentId = 1;
            const res = await request
                .post("/vca/v1/api/vcaReport/submitVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .send(replyCommentData);
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.noReplyToYours);
        });
        it("Submit comments with missing required fields should throw error", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/submitVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .send({ reportId: commentsData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
        const unknownComment = _.cloneDeep(commentsData);
        unknownComment.reportId = unknownReportData.reportId;
        it("Commenting unknown VCA Report should throw error", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/submitVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .send(unknownComment);
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
        const alreadyDeleteComment = _.cloneDeep(commentsData);
        alreadyDeleteComment.reportId = alreadyDeletedData.reportId;
        it("Commenting already deleted VCA Report should throw error", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/submitVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .send(alreadyDeleteComment);
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.alreadyDeleted);
        });
        let draftComment = _.cloneDeep(commentsData);
        draftComment.reportId = draftData.reportId;
        it("Commenting draft VCA Report should throw error", async () => {
            const res = await request
                .post("/vca/v1/api/vcaReport/submitVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .send(draftComment);
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.reportCannotComment);
        });
    });
    describe("DELETE /vca/v1/api/vcaReport/deleteVcaComment", () => {
        it("Delete comment to VCA Report", async () => {
            await models.vcaComments.update(
                { replyCommentId: null },
                { where: { reportId: commentsData.reportId } }
            );
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: commentsData.reportId, commentId: 1 });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Delete unknwon comment to VCA Report should throw error", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: commentsData.reportId, commentId: 100 });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.commentNotFound);
        });
        it("Delete others comment to VCA Report should throw error", async () => {
            await models.vcaComments.update(
                { role: 28, status: 1 },
                { where: { reportId: commentsData.reportId } }
            );
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: commentsData.reportId, commentId: 1 });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.otherComment);
        });
        it("Delete replied comment to VCA Report should throw error", async () => {
            await models.vcaComments.update(
                { role: 1, status: 1, replyCommentId: 1 },
                { where: { reportId: commentsData.reportId } }
            );
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: commentsData.reportId, commentId: 1 });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.replyCommentNotDelete);
        });
        it("Delete comments with missing required fields should throw error", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: commentsData.reportId });
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
        let unknownComment = _.cloneDeep(commentsData);
        unknownComment.reportId = unknownReportData.reportId;
        it("Deleting comment for unknown VCA Report should throw error", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: unknownComment.reportId, commentId: 1 });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
        let alreadyDeleteComment = _.cloneDeep(commentsData);
        alreadyDeleteComment.reportId = alreadyDeletedData.reportId;
        it("Deleting comment for already deleted VCA Report should throw error", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: alreadyDeleteComment.reportId, commentId: 1 });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.alreadyDeleted);
        });
        let draftComment = _.cloneDeep(commentsData);
        draftComment.reportId = draftData.reportId;
        it("Deleting Comment for draft VCA Report should throw error", async () => {
            const res = await request
                .delete("/vca/v1/api/vcaReport/deleteVcaComment")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: draftComment.reportId, commentId: 1 });
            expect(res.statusCode).toBe(errorCodes.HTTP_CONFLICT);
            expect(res.body.message).toBe(errorMessages.reportCannotComment);
        });
    });
    describe("GET /vca/v1/api/vcaReport/getVcaComments", () => {
        it("Get all comments for VCA Report", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaComments")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: commentsData.reportId, showAll: true });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Get limitted comments for VCA Report", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaComments")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: commentsData.reportId, showAll: false });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Get already deleted VCA Report comments should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaComments")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: alreadyDeletedData.reportId, showAll: false });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.alreadyDeleted);
        });
        it("Get unknown VCA Report comments should throw error", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaComments")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: unknownReportData.reportId, showAll: false });
            expect(res.statusCode).toBe(errorCodes.HTTP_BAD_REQUEST);
            expect(res.body.message).toBe(errorMessages.reportNotFound);
        });
        it("Get VCA Report comments when Comments Read table data not present", async () => {
            await models.vcaCommentsRead.destroy({ where: { reportId: commentsData.reportId } });
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaComments")
                .set("token", token)
                .set("authorization", authorization)
                .query({ reportId: commentsData.reportId, showAll: false });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("should throw error with missing required fields", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaComments")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("GET /vca/v1/api/vcaReport/getVcaActivities", () => {
        it("Get VCA Activities", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaActivities")
                .set("token", token)
                .set("authorization", authorization)
                .query({ activityId: 1, commodityId: 1 });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Should throw error when params not pased", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/getVcaActivities")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
    });
    describe("GET /vca/v1/api/vcaReport/dashboard", () => {
        it("Get VCA Dashboard Data by Commodity Id", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/dashboard")
                .set("token", token)
                .set("authorization", authorization)
                .query({ commodityId: vcaFarmReportData.vcaOverview.commodityId.value });
            expect(res.statusCode).toBe(errorCodes.HTTP_OK);
            expect(res.body.message).toBe(errorMessages.success);
        });
        it("Should throw error when params commodityId not given", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/dashboard")
                .set("token", token)
                .set("authorization", authorization);
            expect(res.statusCode).toBe(errorCodes.HTTP_UNPROCESSABLE_ENTITY);
        });
        it("Should throw error when params commodityId is not Approved ", async () => {
            const res = await request
                .get("/vca/v1/api/vcaReport/dashboard")
                .set("token", token)
                .set("authorization", authorization)
                .query({ commodityId: 3 });
            expect(res.statusCode).toBe(errorCodes.HTTP_NOT_FOUND);
        });
    });
};

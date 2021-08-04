const express = require("express");
const router = express.Router();
const { VcaReportController } = require("../../controllers");
const validators = require("../../validators");
const { verifyToken, hasRole, docUpload } = require("../../utils");
const { ACTION } = require("../../constants");

router.get(
    "/createVcaReport",
    verifyToken,
    hasRole(ACTION.CREATE),
    validators.createVcaReport,
    VcaReportController.createVcaReport
);
router.delete(
    "/deleteVcaReport",
    verifyToken,
    hasRole(ACTION.DELETE),
    validators.deleteVcaReport,
    VcaReportController.deleteVcaReport
);
router.delete(
    "/hardDeleteVcaReport",
    validators.hardDeleteVcaReport,
    VcaReportController.hardDeleteVcaReport
);
router.post(
    "/fillVcaReport",
    verifyToken,
    hasRole(ACTION.CREATE),
    VcaReportController.fillVcaReport
);
router.get(
    "/submitVcaReport",
    verifyToken,
    hasRole(ACTION.CREATE),
    validators.submitVcaReport,
    VcaReportController.submitVcaReport
);
router.get(
    "/getVcaReportById",
    verifyToken,
    hasRole(ACTION.VIEW),
    validators.getVcaReportById,
    VcaReportController.getVcaReportById
);
router.get(
    "/reviewVcaReport",
    verifyToken,
    hasRole(ACTION.REVIEW),
    validators.reviewVcaReport,
    VcaReportController.reviewVcaReport
);
router.get(
    "/approveVcaReport",
    verifyToken,
    hasRole(ACTION.APPROVE),
    validators.approveVcaReport,
    VcaReportController.approveVcaReport
);
router.get("/getVcaReports", verifyToken, hasRole(ACTION.VIEW), VcaReportController.getVcaReports);
router.get(
    "/getVcaReportLists",
    verifyToken,
    hasRole(ACTION.VIEW),
    validators.getVcaReportLists,
    VcaReportController.getVcaReportLists
);
router.post(
    "/submitVcaComment",
    verifyToken,
    hasRole(ACTION.COMMENT),
    validators.submitVcaComment,
    VcaReportController.submitVcaComment
);
router.delete(
    "/deleteVcaComment",
    verifyToken,
    hasRole(ACTION.COMMENT),
    validators.deleteVcaComment,
    VcaReportController.deleteVcaComment
);
router.get(
    "/getVcaComments",
    verifyToken,
    hasRole(ACTION.VIEW),
    validators.getVcaComments,
    VcaReportController.getVcaComments
);
router.get(
    "/getVcaActivities",
    verifyToken,
    hasRole(ACTION.VIEW),
    validators.getVcaActivities,
    VcaReportController.getVcaActivities
);
router.post("/uploadDoc", verifyToken, docUpload, VcaReportController.uploadDoc);
router.post(
    "/getSingedUrl",
    verifyToken,
    validators.getSingedUrl,
    VcaReportController.getSingedUrl
);
router.get(
    "/dashboard",
    verifyToken,
    hasRole(ACTION.VIEW),
    validators.dashboard,
    VcaReportController.dashboard
);
module.exports = router;

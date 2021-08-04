const VCA_REPORT_STATUS = {
    DRAFT: 1,
    IN_PROGRESS: 2,
    REVIEWED: 3,
    APPROVED: 4,
};
const DELETE_STATUS = {
    ACTIVE: 1,
    INACTIVE: 0,
};
const ACTION = {
    CREATE: "create",
    VIEW: "view",
    DELETE: "delete",
    COMMENT: "comment",
    REVIEW: "review",
    APPROVE: "approve",
};
const COMMODITY_IDS = {
    FARM: 1,
    OFF_FARM_DAIRY: 98,
    OFF_FARM_FISHERIES: 106,
    TOURISM: 4,
};
const IS_DELETED = {
    DELETED: 1,
    NOT_DELETED: 0,
};
const STAFF_STATUS = {
    ACTIVE: 1,
    INACTIVE: 1,
};
const VCA_FARM_STAGE = {
    OVERVIEW: { VALUE: 1, LABEL: "Overview" },
    GEOGRAPHY: { VALUE: 2, LABEL: "Production Geography" },
    DISTRICTS_COVERED: { VALUE: 3, LABEL: "Districts Covered" },
    COMMODITY_DETAILS: { VALUE: 4, LABEL: "Commodity Details" },
    GROUP_DETAILS: { VALUE: 5, LABEL: "Group Details" },
    ACTIVITES: { VALUE: 6, LABEL: "VCA Activities" },
    SWOT_ANALYSIS: { VALUE: 7, LABEL: "SWOT Analysis" },
    DOC_UPLOAD: { VALUE: 8, LABEL: "Upload Document" },
};
const VCA_OFF_FARM_DAIRY_STAGE = {
    OVERVIEW: { VALUE: 1, LABEL: "Overview" },
    GEOGRAPHY: { VALUE: 2, LABEL: "Production Geography" },
    DISTRICTS_COVERED: { VALUE: 3, LABEL: "Districts Covered" },
    COMMODITY_DETAILS: { VALUE: 4, LABEL: "Commodity Details" },
    GROUP_DETAILS: { VALUE: 5, LABEL: "Group Details" },
    ACTIVITES: { VALUE: 6, LABEL: "VCA Activities" },
    SWOT_ANALYSIS: { VALUE: 7, LABEL: "SWOT Analysis" },
    DOC_UPLOAD: { VALUE: 8, LABEL: "Upload Document" },
};
const VCA_OFF_FARM_FISHERIES_STAGE = {
    OVERVIEW: { VALUE: 1, LABEL: "Overview" },
    GEOGRAPHY: { VALUE: 2, LABEL: "Production Geography" },
    DISTRICTS_COVERED: { VALUE: 3, LABEL: "Districts Covered" },
    COMMODITY_DETAILS: { VALUE: 4, LABEL: "Commodity Details" },
    GROUP_DETAILS: { VALUE: 5, LABEL: "Group Details" },
    ACTIVITES: { VALUE: 6, LABEL: "VCA Activities" },
    SWOT_ANALYSIS: { VALUE: 7, LABEL: "SWOT Analysis" },
    DOC_UPLOAD: { VALUE: 8, LABEL: "Upload Document" },
};
const MESSAGE_TYPE = {
    UPLOAD: "inProgess",
    EDIT: "updated",
    REVIEW: "reviewed",
    APPROVE: "approved",
    COMMENT: "comment",
    REPLY_COMMENT: "replyComment",
};
module.exports.VCA_REPORT_STATUS = VCA_REPORT_STATUS;
module.exports.DELETE_STATUS = DELETE_STATUS;
module.exports.ACTION = ACTION;
module.exports.COMMODITY_IDS = COMMODITY_IDS;
module.exports.IS_DELETED = IS_DELETED;
module.exports.STAFF_STATUS = STAFF_STATUS;
module.exports.VCA_FARM_STAGE = VCA_FARM_STAGE;
module.exports.VCA_OFF_FARM_DAIRY_STAGE = VCA_OFF_FARM_DAIRY_STAGE;
module.exports.VCA_OFF_FARM_FISHERIES_STAGE = VCA_OFF_FARM_FISHERIES_STAGE;
module.exports.MESSAGE_TYPE = MESSAGE_TYPE;

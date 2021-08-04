const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaDocUpload = sequelize.define(
        "VCA21_DOCUMENT_UPLOAD",
        {
            VCA21_DOCUMENT_UPLOAD_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            documentTitle: { type: DataTypes.STRING, field: "VCA21_DOCUMENT_TITLE_N" },
            authorName: { type: DataTypes.STRING, field: "VCA21_AUTHOR_NAME_N" },
            publishedYear: { type: DataTypes.DATE, field: "VCA21_PUBLISHED_AT" },
            approvalDate: { type: DataTypes.DATE, field: "VCA21_APPROVAL_AT" },
            version: { type: DataTypes.FLOAT(100, 1), field: "VCA21_VERSION_D" },
            noOfPages: { type: DataTypes.INTEGER, field: "VCA21_NO_OF_PAGES_D" },
            keywords: { type: DataTypes.STRING, field: "VCA21_KEYWORDS_N" },
            natureOfInformation: { type: DataTypes.TEXT, field: "VCA21_NATURE_OF_INFORMATION_N" },
            documentName: { type: DataTypes.STRING, field: "VCA21_DOCUMENT_NAME_N" },
            originalName: { type: DataTypes.TEXT, field: "VCA21_DOCUMENT_UPLOAD_NAME_N" },
            isFilled: { type: DataTypes.BOOLEAN, field: "VCA21_IS_FILLED_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA21_STATUS_D" },
            VCA21_CREATED_AT: { type: DataTypes.DATE },
            VCA21_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaDocUpload.commonFields = [
        "documentTitle",
        "authorName",
        "publishedYear",
        "approvalDate",
        [sequelize.literal("CAST(VCA21_VERSION_D AS DECIMAL(10,1))"), "version"],
        "noOfPages",
        "keywords",
        "natureOfInformation",
        "documentName",
        "originalName",
        "isFilled",
    ];
    return vcaDocUpload;
};

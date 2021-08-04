const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaLatestStatusReportView = sequelize.define(
        "VCA03_LATEST_STATUS_REPORT_VIEW",
        {
            reportId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            reportType: { type: DataTypes.STRING },
            roleId: { type: DataTypes.INTEGER },
            districtId: { type: DataTypes.INTEGER },
            documentTitle: { type: DataTypes.STRING },
            filled: { type: DataTypes.INTEGER },
            totalSection: { type: DataTypes.INTEGER },
            sectionsFilled: { type: DataTypes.STRING },
            applicationStatus: { type: DataTypes.INTEGER },
            activityId: { type: DataTypes.INTEGER },
            commodityId: { type: DataTypes.INTEGER },
            uploadedOn: { type: DataTypes.DATE },
            activityName: { type: DataTypes.STRING },
            commodityName: { type: DataTypes.STRING },
            approvedOn: { type: DataTypes.DATE },
            uploadedBy: { type: DataTypes.STRING },
            districtName: { type: DataTypes.STRING },
            version: { type: DataTypes.FLOAT(100, 1) },
            applicationStatusLabel: { type: DataTypes.STRING },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaLatestStatusReportView.vcaFarmSwotAnalysisFields = [
        "reportId",
        "reportType",
        "roleId",
        "districtId",
        "documentTitle",
        "filled",
        "totalSection",
        "sectionsFilled",
        "applicationStatus",
        "activityId",
        "commodityId",
        "uploadedOn",
        "activityName",
        "commodityName",
        "approvedOn",
        "uploadedBy",
        "districtName",
        "version",
        "applicationStatusLabel",
    ];
    return vcaLatestStatusReportView;
};

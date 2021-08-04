const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaReport = sequelize.define(
        "VCA08_REPORT",
        {
            reportId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "VCA08_REPORT_D",
            },
            version: { type: DataTypes.FLOAT(100, 1), field: "VCA08_VERSION_D" },
            activityId: { type: DataTypes.INTEGER, field: "VCA01_ACTIVITY_MASTER_D" },
            commodityId: { type: DataTypes.INTEGER, field: "VCA02_COMMODITY_MASTER_D" },
            applicationStatus: { type: DataTypes.INTEGER, field: "VCA08_APPLICATION_STATUS_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA08_STATUS_D" },
            VCA08_CREATED_AT: { type: DataTypes.DATE },
            VCA08_UPDATED_AT: { type: DataTypes.DATE },
            VCA08_CREATED_D: { type: DataTypes.INTEGER },
            VCA08_UPDATED_D: { type: DataTypes.INTEGER },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaReport.associate = function (models) {
        vcaReport.hasOne(models.vcaOverview, {
            foreignKey: "VCA08_REPORT_D",
            as: "vcaOverview",
        });
        vcaReport.hasOne(models.vcaGeography, {
            foreignKey: "VCA08_REPORT_D",
            as: "vcaGeography",
        });
        vcaReport.hasOne(models.vcaDistrictsCovered, {
            foreignKey: "VCA08_REPORT_D",
            as: "vcaDistrictsCovered",
        });
        vcaReport.hasOne(models.vcaGroupDetails, {
            foreignKey: "VCA08_REPORT_D",
            as: "vcaGroupDetails",
        });
        vcaReport.hasMany(models.vcaCommodityDetails, {
            foreignKey: "VCA08_REPORT_D",
            as: "vcaCommodityDetails",
        });
        vcaReport.hasOne(models.vcaSwotAnalysis, {
            foreignKey: "VCA08_REPORT_D",
            as: "vcaSwotAnalysis",
        });
        vcaReport.hasOne(models.vcaDocUpload, {
            foreignKey: "VCA08_REPORT_D",
            as: "vcaDocUpload",
        });
        vcaReport.hasOne(models.vcaActivities, {
            foreignKey: "VCA08_REPORT_D",
            as: "vcaActivities",
        });
        vcaReport.hasMany(models.vcaActivityView, {
            foreignKey: "reportId",
            as: "vcaActivityView",
        });
        vcaReport.hasOne(models.vcaReportView, {
            foreignKey: "reportId",
            as: "vcaReportView",
        });
        vcaReport.hasOne(models.vcaLatestStatusReportView, {
            foreignKey: "reportId",
            as: "vcaLatestStatusReportView",
        });
    };
    vcaReport.selectedFields = [
        "reportId",
        [sequelize.literal("CAST(VCA08_VERSION_D AS DECIMAL(10,1))"), "version"],
        "activityId",
        "commodityId",
        "applicationStatus",
        "status",
    ];
    return vcaReport;
};

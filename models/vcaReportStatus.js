const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaReportStatus = sequelize.define(
        "VCA22_REPORT_STATUS",
        {
            VCA22_REPORT_STATUS_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            applicationStatus: { type: DataTypes.INTEGER, field: "VCA22_APPLICATION_STATUS_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA22_STATUS_D" },
            VCA22_CREATED_AT: { type: DataTypes.DATE },
            VCA22_UPDATED_AT: { type: DataTypes.DATE },
            VCA22_CREATED_D: { type: DataTypes.INTEGER },
            VCA22_UPDATED_D: { type: DataTypes.INTEGER },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaReportStatus.vcaFarmSwotAnalysisFields = ["applicationStatus"];
    return vcaReportStatus;
};

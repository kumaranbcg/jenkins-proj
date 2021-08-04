const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaActivityView = sequelize.define(
        "VCA04_ACTIVITY_VIEW",
        {
            reportId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            createdAt: { type: DataTypes.DATE },
            message: { type: DataTypes.STRING },
            activityType: { type: DataTypes.INTEGER },
            userName: { type: DataTypes.STRING },
            roleName: { type: DataTypes.STRING },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaActivityView.vcaFarmSwotAnalysisFields = [
        "createdAt",
        "message",
        "activityType",
        "userName",
        "roleName",
    ];
    return vcaActivityView;
};

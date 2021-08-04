const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaSwotAnalysis = sequelize.define(
        "VCA20_SWOT_ANALYSIS",
        {
            VCA20_SWOT_ANALYSIS_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            strength: { type: DataTypes.TEXT, field: "VCA20_STRENGTH_N" },
            weekness: { type: DataTypes.TEXT, field: "VCA20_WEEKNESS_N" },
            opportunity: { type: DataTypes.TEXT, field: "VCA20_OPPORTUNITY_N" },
            threats: { type: DataTypes.TEXT, field: "VCA20_THREATS_N" },
            isAnyOther: { type: DataTypes.TEXT, field: "VCA20_IF_ANY_OTHER_N" },
            isFilled: { type: DataTypes.BOOLEAN, field: "VCA20_IS_FILLED_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA20_STATUS_D" },
            VCA20_CREATED_AT: { type: DataTypes.DATE },
            VCA20_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaSwotAnalysis.commonFields = ["strength", "weekness", "opportunity", "threats", "isAnyOther"];
    return vcaSwotAnalysis;
};

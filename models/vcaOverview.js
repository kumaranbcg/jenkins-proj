const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaOverview = sequelize.define(
        "VCA09_OVERVIEW",
        {
            VCA09_OVERVIEW_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            description: { type: DataTypes.STRING, field: "VCA09_DESCRIPTION_D" },
            commodityId: { type: DataTypes.INTEGER, field: "VCA02_COMMODITY_MASTER_D" },
            isFilled: { type: DataTypes.BOOLEAN, field: "VCA09_IS_FILLED_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA09_STATUS_D" },
            VCA09_CREATED_AT: { type: DataTypes.DATE },
            VCA09_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaOverview.associate = function (models) {
        vcaOverview.belongsTo(models.commodityMaster, {
            foreignKey: "VCA02_COMMODITY_MASTER_D",
            as: "commodityMaster",
        });
    };
    vcaOverview.selectedFields = ["reportId", "description", "commodityId", "isFilled"];
    return vcaOverview;
};

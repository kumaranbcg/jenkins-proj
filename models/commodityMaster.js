const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const commodityMaster = sequelize.define(
        "VCA02_COMMODITY_MASTER",
        {
            value: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "VCA02_COMMODITY_MASTER_D",
            },
            activityId: { type: DataTypes.STRING, field: "VCA01_ACTIVITY_MASTER_D" },
            label: { type: DataTypes.STRING, field: "VCA02_COMMODITY_NAME_N" },
            labelTamil: { type: DataTypes.STRING, field: "VCA02_COMMODITY_TAMIL_NAME_N" },
            reportType: { type: DataTypes.STRING, field: "VCA02_REPORT_TYPE_N" },
            isReport: { type: DataTypes.BOOLEAN, field: "VCA02_IS_REPORT_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA02_STATUS_D" },
            VCA02_CREATED_AT: { type: DataTypes.DATE },
            VCA02_UPDATED_AT: { type: DataTypes.DATE },
        },
        {
            freezeTableName: true,
            timestamps: false,
            schema: config.database,
        }
    );
    commodityMaster.associate = function (models) {
        commodityMaster.hasOne(models.vcaReport, {
            foreignKey: "VCA02_COMMODITY_MASTER_D",
            as: "vcaReport",
        });
    };
    commodityMaster.selectedFields = ["value", "label", "reportType", "isReport"];
    return commodityMaster;
};

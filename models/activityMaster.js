const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const activityMaster = sequelize.define(
        "VCA01_ACTIVITY_MASTER",
        {
            value: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "VCA01_ACTIVITY_MASTER_D",
            },
            label: { type: DataTypes.STRING, field: "VCA01_ACTIVITY_NAME_N" },
            labelTamil: { type: DataTypes.STRING, field: "VCA01_ACTIVITY_TAMIL_NAME_N" },
            reportType: { type: DataTypes.STRING, field: "VCA01_REPORT_TYPE_N" },
            status: { type: DataTypes.BOOLEAN, field: "VCA01_STATUS_D" },
            VCA01_CREATED_AT: { type: DataTypes.DATE },
            VCA01_UPDATED_AT: { type: DataTypes.DATE },
        },
        {
            freezeTableName: true,
            timestamps: false,
            schema: config.database,
        }
    );
    activityMaster.associate = function (models) {
        activityMaster.hasMany(models.commodityMaster, {
            foreignKey: "VCA01_ACTIVITY_MASTER_D",
            as: "commodityMaster",
        });
    };
    activityMaster.selectedFields = ["value", "label"];
    return activityMaster;
};

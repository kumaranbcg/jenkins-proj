
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const stageMaster = sequelize.define(
        "VCA06_STAGE_MASTER",
        {
            value: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "VCA06_STAGE_MASTER_D",
            },
            label: { type: DataTypes.STRING, field: "VCA06_STAGE_NAME_N" },
            status: { type: DataTypes.BOOLEAN, field: "VCA06_STATUS_D" },
            VCA06_CREATED_AT: { type: DataTypes.DATE },
            VCA06_UPDATED_AT: { type: DataTypes.DATE },
        },
        {
            freezeTableName: true,
            timestamps: false,
            schema: config.database,
        }
    );
    stageMaster.selectedFields = ["value", "label"];
    return stageMaster;
};

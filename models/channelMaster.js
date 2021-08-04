
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const channelMaster = sequelize.define(
        "VCA07_CHANNEL_MASTER",
        {
            value: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "VCA07_CHANNEL_MASTER_D",
            },
            label: { type: DataTypes.INTEGER, field: "VCA07_CHANNEL_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA07_STATUS_D" },
            VCA07_CREATED_AT: { type: DataTypes.DATE },
            VCA07_UPDATED_AT: { type: DataTypes.DATE },
        },
        {
            freezeTableName: true,
            timestamps: false,
            schema: config.database,
        }
    );
    channelMaster.selectedFields = ["value", "label"];
    return channelMaster;
};

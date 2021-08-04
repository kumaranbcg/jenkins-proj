
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const stateMaster = sequelize.define(
        "VCA04_STATE_MASTER",
        {
          value: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "VCA04_STATE_MASTER_D",
            },
            label: { type: DataTypes.STRING, field: "VCA04_STATE_NAME_N" },
            labelTamil: { type: DataTypes.STRING, field: "VCA04_STATE_TAMIL_NAME_N" },
            imageUrl: { type: DataTypes.STRING, field: "VCA04_STATE_IMAGE_URL_N" },
            status: { type: DataTypes.BOOLEAN, field: "VCA04_STATUS_D" },
            VCA04_CREATED_AT: { type: DataTypes.DATE },
            VCA04_UPDATED_AT: { type: DataTypes.DATE },
        },
        {
            freezeTableName: true,
            timestamps: false,
            schema: config.database,
        }
    );

    stateMaster.selectedFields = ["value", "label", "labelTamil", "imageUrl"];
    return stateMaster;
};

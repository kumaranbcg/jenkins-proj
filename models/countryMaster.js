const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const countryMaster = sequelize.define(
        "VCA03_COUNTRY_MASTER",
        {
            value: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "VCA03_COUNTRY_MASTER_D",
            },
            label: { type: DataTypes.STRING, field: "VCA03_COUNTRY_NAME_N" },
            labelTamil: { type: DataTypes.STRING, field: "VCA03_COUNTRY_TAMIL_NAME_N" },
            imageUrl: { type: DataTypes.STRING, field: "VCA03_COUNTRY_IMAGE_URL_N" },
            status: { type: DataTypes.BOOLEAN, field: "VCA03_STATUS_D" },
            VCA03_CREATED_AT: { type: DataTypes.DATE },
            VCA03_UPDATED_AT: { type: DataTypes.DATE },
        },
        {
            freezeTableName: true,
            timestamps: false,
            schema: config.database,
        }
    );

    countryMaster.selectedFields = ["value", "label", "labelTamil", "imageUrl"];
    return countryMaster;
};

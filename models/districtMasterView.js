const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const districtMasterView = sequelize.define(
        "TNRTP07_DISTRICT_MASTER",
        {
            value: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "TNRTP07_DISTRICT_MASTER_D",
            },
            label: { type: DataTypes.STRING, field: "TNRTP07_DISTRICT_NAME" },
            code: { type: DataTypes.BIGINT, field: "TNRTP07_DISTRICT_CODE_D" },
            labelTamil: { type: DataTypes.STRING, field: "TNRTP07_DISTRICT_TAMIL_NAME_N" },
            labelShort: { type: DataTypes.STRING, field: "TNRTP07_DISTRICT_SHORT_NAME_N" },
            isTNRTP: { type: DataTypes.BOOLEAN, field: "TNRTP07_IS_TNRTP_D" },
            status: { type: DataTypes.BOOLEAN, field: "TNRTP07_STATUS" },
            TNRTP07_CREATED_AT: { type: DataTypes.DATE },
            TNRTP07_UPDATED_AT: { type: DataTypes.DATE },
        },
        {
            freezeTableName: true,
            timestamps: false,
            schema: config.database,
        }
    );
    districtMasterView.selectedFields = ["value", "label", "code", "labelTamil", "labelShort"];
    return districtMasterView;
};

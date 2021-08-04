const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const blockMasterView = sequelize.define(
        "TNRTP08_BLOCK_MASTER",
        {
            value: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: "TNRTP08_BLOCK_MASTER_D",
            },
            districtId: { type: DataTypes.INTEGER, field: "TNRTP08_DISTRICT_MASTER_D" },
            code: { type: DataTypes.BIGINT, field: "TNRTP08_BLOCK_CODE_D" },
            labelTamil: { type: DataTypes.STRING, field: "TNRTP08_BLOCK_NAME_TAMIL_N" },
            label: { type: DataTypes.STRING, field: "TNRTP08_BLOCK_NAME" },
            isTNRTP: { type: DataTypes.BOOLEAN, field: "TNRTP08_IS_TNRTP_D" },
            status: { type: DataTypes.BOOLEAN, field: "TNRTP08_STATUS" },
            TNRTP08_CREATED_AT: { type: DataTypes.DATE },
            TNRTP08_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    blockMasterView.selectedFields = ["value", "label", "code", "labelTamil"];
    return blockMasterView;
};

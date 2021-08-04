const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const staffAddressView = sequelize.define(
        "TNRTP12_STAFF_ADDRESS",
        {
            TNRTP12_STAFF_ADDRESS_D: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: { type: DataTypes.INTEGER, field: "TNRTP12_STAFF_MASTER_D" },
            TNRTP12_LINE_1_N: { type: DataTypes.STRING },
            TNRTP12_LINE_2_N: { type: DataTypes.STRING },
            TNRTP12_ADDRESS_TYPE_D: { type: DataTypes.INTEGER },
            districtId: { type: DataTypes.INTEGER, field: "TNRTP12_DISTRICT_MASTER_D" },
            blockId: { type: DataTypes.INTEGER, field: "TNRTP12_BLOCK_MASTER_D" },
            panchayatId: { type: DataTypes.INTEGER, field: "TNRTP12_PANCHAYAT_MASTER_D" },
            TNRTP12_POSTAL_CODE_N: { type: DataTypes.STRING },
            TNRTP12_LOCATION_LATITUDE_N: { type: DataTypes.STRING },
            TNRTP12_LOCATION_LONGITUDE_N: { type: DataTypes.STRING },
            TNRTP12_CREATED_AT: { type: DataTypes.DATE },
            TNRTP12_UPDATED_AT: { type: DataTypes.DATE },
            TNRTP12_CREATED_D: { type: DataTypes.INTEGER },
            TNRTP12_UPDATED_D: { type: DataTypes.INTEGER },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    staffAddressView.selectedFields = ["userId"];
    return staffAddressView;
};

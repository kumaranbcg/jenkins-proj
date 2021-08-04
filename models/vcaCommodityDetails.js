const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaCommodityDetails = sequelize.define(
        "VCA12_COMMODITY_DETAILS",
        {
            VCA12_COMMODITY_DETAILS_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            "2015_2016": { type: DataTypes.INTEGER, field: "VCA12_2015_2016_D" },
            "2016_2017": { type: DataTypes.INTEGER, field: "VCA12_2016_2017_D" },
            "2017_2018": { type: DataTypes.INTEGER, field: "VCA12_2017_2018_D" },
            "2018_2019": { type: DataTypes.INTEGER, field: "VCA12_2018_2019_D" },
            "2019_2020": { type: DataTypes.INTEGER, field: "VCA12_2019_2020_D" },
            unitId: {
                type: DataTypes.INTEGER,
                field: "VCA05_UNITS_MASTER_D",
                set(unitId) {
                    this.setDataValue("unitId", unitId ? unitId.value : null);
                },
                get(unitId) {
                    const unitID = this.getDataValue(unitId);
                    return unitID ? { value: unitID } : null;
                },
            },
            type: { type: DataTypes.INTEGER, field: "VCA12_TYPE_D" },
            key: { type: DataTypes.STRING, field: "VCA12_KEY_N" },
            isFilled: { type: DataTypes.BOOLEAN, field: "VCA12_IS_FILLED_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA12_STATUS_D" },
            VCA12_CREATED_AT: { type: DataTypes.DATE },
            VCA12_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaCommodityDetails.commonFields = [
        "2015_2016",
        "2016_2017",
        "2017_2018",
        "2018_2019",
        "2019_2020",
        "unitId",
        "key",
    ];
    vcaCommodityDetails.vcaFarmCommodityDetailsFields = [...vcaCommodityDetails.commonFields];
    vcaCommodityDetails.vcaOffFarmFisheriesCommodityDetailsFields = [
        ...vcaCommodityDetails.commonFields,
    ];
    return vcaCommodityDetails;
};

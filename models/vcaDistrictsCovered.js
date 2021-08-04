const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaDistrictsCovered = sequelize.define(
        "VCA11_DISTRICTS_COVERED",
        {
            VCA11_DISTRICTS_COVERED_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            noOfDistricts: { type: DataTypes.INTEGER, field: "VCA11_NO_OF_DISTRICTS_D" },
            noOfBlocks: { type: DataTypes.INTEGER, field: "VCA11_NO_OF_BLOCKS_D" },
            noOfTnrtpDistricts: { type: DataTypes.INTEGER, field: "VCA11_NO_OF_TNRTP_DISTRICTS_D" },
            noOfTnrtpBlocks: { type: DataTypes.INTEGER, field: "VCA11_NO_OF_TNRTP_BLOCKS_D" },
            variteyTypes: {
                type: DataTypes.TEXT,
                field: "VCA11_VARITEY_TYPES_N",
                set(variteyTypes) {
                    this.setDataValue(
                        "variteyTypes",
                        variteyTypes && variteyTypes.length ? variteyTypes.join(",") : null
                    );
                },
                get(variteyTypes) {
                    const rawValue = this.getDataValue(variteyTypes);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            isFilled: { type: DataTypes.BOOLEAN, field: "VCA11_IS_FILLED_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA11_STATUS_D" },
            VCA11_CREATED_AT: { type: DataTypes.DATE },
            VCA11_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaDistrictsCovered.commonFields = [
        "noOfDistricts",
        "noOfBlocks",
        "noOfTnrtpDistricts",
        "noOfTnrtpBlocks",
    ];
    vcaDistrictsCovered.vcaFarmDistrictsCoveredFields = [
        ...vcaDistrictsCovered.commonFields,
        "variteyTypes",
    ];
    vcaDistrictsCovered.vcaOffFarmFisheriesDistrictsCoveredFields = [
        ...vcaDistrictsCovered.commonFields,
    ];
    return vcaDistrictsCovered;
};

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaGeography = sequelize.define(
        "VCA10_GEOGRAPHY",
        {
            VCA10_GEOGRAPHY_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            countryId: {
                type: DataTypes.INTEGER,
                field: "VCA03_COUNTRY_MASTER_D",
                set(countryId) {
                    this.setDataValue("countryId", countryId ? countryId.value : null);
                },
            },
            countryCultivationArea: {
                type: DataTypes.BIGINT,
                field: "VCA10_COUNTRY_CULTIVATION_AREA_D",
            },
            countryCultivationAreaUnit: {
                type: DataTypes.INTEGER,
                field: "VCA10_COUNTRY_CULTIVATION_AREA_UNIT_D",
                set(countryCultivationAreaUnit) {
                    this.setDataValue(
                        "countryCultivationAreaUnit",
                        countryCultivationAreaUnit ? countryCultivationAreaUnit.value : null
                    );
                },
            },
            countryProductionPercent: {
                type: DataTypes.INTEGER,
                field: "VCA10_COUNTRY_PRODUCTION_PERCENT_D",
            },
            countryProductionVolume: {
                type: DataTypes.INTEGER,
                field: "VCA10_COUNTRY_PRODUCTION_VOLUME_D",
            },
            countryProductionVolumeUnit: {
                type: DataTypes.INTEGER,
                field: "VCA10_COUNTRY_PRODUCTION_VOLUME_UNIT_D",
                set(countryProductionVolumeUnit) {
                    this.setDataValue(
                        "countryProductionVolumeUnit",
                        countryProductionVolumeUnit ? countryProductionVolumeUnit.value : null
                    );
                },
            },
            indiaRanking: { type: DataTypes.INTEGER, field: "VCA10_INDIA_RANKING_D" },
            stateId: {
                type: DataTypes.INTEGER,
                field: "VCA04_STATE_MASTER_D",
                set(stateId) {
                    this.setDataValue("stateId", stateId ? stateId.value : null);
                },
            },
            stateCultivationArea: {
                type: DataTypes.BIGINT,
                field: "VCA10_STATE_CULTIVATION_AREA_D",
            },
            stateCultivationAreaUnit: {
                type: DataTypes.INTEGER,
                field: "VCA10_STATE_CULTIVATION_AREA_UNIT_D",
                set(stateCultivationAreaUnit) {
                    this.setDataValue(
                        "stateCultivationAreaUnit",
                        stateCultivationAreaUnit ? stateCultivationAreaUnit.value : null
                    );
                },
            },
            stateProductionPercent: {
                type: DataTypes.INTEGER,
                field: "VCA10_STATE_PRODUCTION_PERCENT_D",
            },
            stateProductionVolume: {
                type: DataTypes.INTEGER,
                field: "VCA10_STATE_PRODUCTION_VOLUME_D",
            },
            stateProductionVolumeUnit: {
                type: DataTypes.INTEGER,
                field: "VCA10_STATE_PRODUCTION_VOLUME_UNIT_D",
                set(stateProductionVolumeUnit) {
                    this.setDataValue(
                        "stateProductionVolumeUnit",
                        stateProductionVolumeUnit ? stateProductionVolumeUnit.value : null
                    );
                },
            },
            tamilNaduRanking: { type: DataTypes.INTEGER, field: "VCA10_TAMIL_NADU_RANKING_D" },
            districtId: {
                type: DataTypes.INTEGER,
                field: "TNRTP07_DISTRICT_MASTER_D",
                set(districtId) {
                    this.setDataValue("districtId", districtId ? districtId.value : null);
                },
            },
            districtCultivationArea: {
                type: DataTypes.BIGINT,
                field: "VCA10_DISTRICT_CULTIVATION_AREA_D",
            },
            districtCultivationAreaUnit: {
                type: DataTypes.INTEGER,
                field: "VCA10_DISTRICT_CULTIVATION_AREA_UNIT_D",
                set(districtCultivationAreaUnit) {
                    this.setDataValue(
                        "districtCultivationAreaUnit",
                        districtCultivationAreaUnit ? districtCultivationAreaUnit.value : null
                    );
                },
            },
            districtProductionPercent: {
                type: DataTypes.INTEGER,
                field: "VCA10_DISTRICT_PRODUCTION_PERCENT_D",
            },
            districtProductionVolume: {
                type: DataTypes.INTEGER,
                field: "VCA10_DISTRICT_PRODUCTION_VOLUME_D",
            },
            districtProductionVolumeUnit: {
                type: DataTypes.INTEGER,
                field: "VCA10_DISTRICT_PRODUCTION_VOLUME_UNIT_D",
                set(districtProductionVolumeUnit) {
                    this.setDataValue(
                        "districtProductionVolumeUnit",
                        districtProductionVolumeUnit ? districtProductionVolumeUnit.value : null
                    );
                },
            },
            isFilled: { type: DataTypes.BOOLEAN, field: "VCA10_IS_FILLED_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA10_STATUS_D" },
            VCA10_CREATED_AT: { type: DataTypes.DATE },
            VCA10_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaGeography.associate = function (models) {
        vcaGeography.belongsTo(models.countryMaster, {
            foreignKey: "VCA03_COUNTRY_MASTER_D",
            as: "countryMaster",
        });
        vcaGeography.belongsTo(models.stateMaster, {
            foreignKey: "VCA04_STATE_MASTER_D",
            as: "stateMaster",
        });
        vcaGeography.belongsTo(models.districtMasterView, {
            foreignKey: "TNRTP07_DISTRICT_MASTER_D",
            as: "districtMasterView",
        });
    };
    vcaGeography.commonFields = [
        "countryProductionPercent",
        "countryProductionVolume",
        "countryProductionVolumeUnit",
        "indiaRanking",
        "stateProductionPercent",
        "stateProductionVolume",
        "stateProductionVolumeUnit",
        "tamilNaduRanking",
        "districtProductionPercent",
        "districtProductionVolume",
        "districtProductionVolumeUnit",
    ];
    vcaGeography.vcaFarmGeographyFields = [
        ...vcaGeography.commonFields,
        "countryCultivationArea",
        "countryCultivationAreaUnit",
        "stateCultivationArea",
        "stateCultivationAreaUnit",
        "districtCultivationArea",
        "districtCultivationAreaUnit",
    ];
    vcaGeography.vcaOffFarmFisheriesGeographyFields = [...vcaGeography.commonFields];
    return vcaGeography;
};

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaMajorResource = sequelize.define(
        "VCA18_MAJOR_RESOURCE",
        {
            VCA18_MAJOR_RESOURCE_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            activitiesId: { type: DataTypes.INTEGER, field: "VCA14_ACTIVITIES_D" },
            institutionDepartment: {
                type: DataTypes.STRING,
                field: "VCA18_INSTITUTION_DEPARTMENT_N",
            },
            location: { type: DataTypes.STRING, field: "VCA18_LOCATION_N" },
            key: { type: DataTypes.STRING, field: "VCA18_KEY_N" },
            status: { type: DataTypes.BOOLEAN, field: "VCA18_STATUS_D" },
            VCA18_CREATED_AT: { type: DataTypes.DATE },
            VCA18_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaMajorResource.commonFields = ["institutionDepartment", "location", "key"];
    vcaMajorResource.vcaFarmMajorResourceFields = [...vcaMajorResource.commonFields];
    vcaMajorResource.vcaOffFarmFisheriesMajorResourceFields = [...vcaMajorResource.commonFields];
    return vcaMajorResource;
};

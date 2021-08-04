const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaLinkages = sequelize.define(
        "VCA19_LINKAGES",
        {
            VCA19_LINKAGES_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            activitiesId: { type: DataTypes.INTEGER, field: "VCA14_ACTIVITIES_D" },
            recommendedLinkage: { type: DataTypes.STRING, field: "VCA19_RECOMMENDED_LINKAGE_N" },
            institutionDepartment: {
                type: DataTypes.STRING,
                field: "VCA19_INSTITUTION_DEPARMENT_N",
                set(institutionDepartment) {
                    this.setDataValue(
                        "institutionDepartment",
                        institutionDepartment && institutionDepartment.length
                            ? institutionDepartment.join(",")
                            : null
                    );
                },
                get(institutionDepartment) {
                    const rawValue = this.getDataValue(institutionDepartment);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            status: { type: DataTypes.BOOLEAN, field: "VCA19_STATUS_D" },
            VCA19_CREATED_AT: { type: DataTypes.DATE },
            VCA19_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaLinkages.commonFields = ["institutionDepartment", "recommendedLinkage"];
    vcaLinkages.vcaFarmLinkagesFields = [...vcaLinkages.commonFields];
    vcaLinkages.vcaOffFarmFisheriesLinkagesFields = [...vcaLinkages.commonFields];
    return vcaLinkages;
};

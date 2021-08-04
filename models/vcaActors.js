const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaActors = sequelize.define(
        "VCA15_ACTORS",
        {
            VCA15_ACTORS_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            actorName: { type: DataTypes.STRING, field: "VCA15_ACTOR_NAME_N" },
            actorRole: { type: DataTypes.STRING, field: "VCA15_ACTOR_ROLE_N" },
            stage: { type: DataTypes.STRING, field: "VCA27_STAGE_N" },
            status: { type: DataTypes.BOOLEAN, field: "VCA15_STATUS_D" },
            VCA15_CREATED_AT: { type: DataTypes.DATE },
            VCA15_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaActors.commonFields = ["actorName", "actorRole", "stage"];
    vcaActors.vcaFarmActorsFields = [...vcaActors.commonFields];
    vcaActors.vcaOffFarmFisheriesActorsFields = [...vcaActors.commonFields];
    return vcaActors;
};

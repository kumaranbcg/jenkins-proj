const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaIntervention = sequelize.define(
        "VCA17_INTERVENTION",
        {
            VCA17_INTERVENTION_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            activitiesId: { type: DataTypes.INTEGER, field: "VCA14_ACTIVITIES_D" },
            interventionName: { type: DataTypes.STRING, field: "VCA17_INTERVENTION_NAME_N" },
            stageId: {
                type: DataTypes.INTEGER,
                field: "VCA06_STAGE_MASTER_D",
                set(stageId) {
                    this.setDataValue("stageId", stageId ? stageId.value : null);
                },
            },
            status: { type: DataTypes.BOOLEAN, field: "VCA17_STATUS_D" },
            VCA17_CREATED_AT: { type: DataTypes.DATE },
            VCA17_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaIntervention.associate = function (models) {
        vcaIntervention.belongsTo(models.stageMaster, {
            foreignKey: "VCA06_STAGE_MASTER_D",
            as: "stageMaster",
        });
    };
    vcaIntervention.commonFields = ["interventionName"];
    vcaIntervention.vcaFarmInterventionFields = [...vcaIntervention.commonFields];
    vcaIntervention.vcaOffFarmFisheriesInterventionFields = [...vcaIntervention.commonFields];
    return vcaIntervention;
};

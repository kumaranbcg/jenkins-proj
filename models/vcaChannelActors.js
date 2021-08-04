const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaChannelActors = sequelize.define(
        "VCA27_CHANNEL_ACTORS",
        {
            VCA27_CHANNEL_ACTORS_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            actorName: { type: DataTypes.STRING, field: "VCA27_ACTOR_NAME_N" },
            channel: { type: DataTypes.INTEGER, field: "VCA27_CHANNEL_D" },
            stage: { type: DataTypes.STRING, field: "VCA27_STAGE_N" },
            priceSpread: { type: DataTypes.INTEGER, field: "VCA27_PRICE_SPREAD_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA27_STATUS_D" },
            VCA27_CREATED_AT: { type: DataTypes.DATE },
            VCA27_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaChannelActors.commonFields = ["actorName", "channel", "stage", "priceSpread"];
    vcaChannelActors.vcaFarmChannelActorsFields = [...vcaChannelActors.commonFields];
    vcaChannelActors.vcaOffFarmFisheriesChannelActorsFields = [...vcaChannelActors.commonFields];
    return vcaChannelActors;
};

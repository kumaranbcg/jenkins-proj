const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaProposedValueChain = sequelize.define(
        "VCA16_PROPOSED_VALUE_CHAIN",
        {
            VCA16_PROPOSED_VALUE_CHAIN_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            activitiesId: { type: DataTypes.INTEGER, field: "VCA14_ACTIVITIES_D" },
            channel: { type: DataTypes.INTEGER, field: "VCA16_CHANNEL_D" },
            actorNames: {
                type: DataTypes.STRING,
                field: "VCA16_ACTOR_NAMES_N",
                set(actorNames) {
                    this.setDataValue(
                        "actorNames",
                        actorNames && actorNames.length ? actorNames.join(",") : null
                    );
                },
                get(actorNames) {
                    const rawValue = this.getDataValue(actorNames);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            status: { type: DataTypes.BOOLEAN, field: "VCA16_STATUS_D" },
            VCA16_CREATED_AT: { type: DataTypes.DATE },
            VCA16_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaProposedValueChain.commonFields = ["actorNames", "channel"];
    vcaProposedValueChain.vcaFarmProposedValueChainFields = [...vcaProposedValueChain.commonFields];
    vcaProposedValueChain.vcaOffFarmFisheriesProposedValueChainFields = [
        ...vcaProposedValueChain.commonFields,
    ];
    return vcaProposedValueChain;
};

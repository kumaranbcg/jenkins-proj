"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA16_PROPOSED_VALUE_CHAIN",
                {
                    VCA16_PROPOSED_VALUE_CHAIN_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA14_ACTIVITIES_D: { type: Sequelize.INTEGER },
                    VCA16_CHANNEL_D: { type: Sequelize.INTEGER },
                    VCA16_ACTOR_NAMES_N: { type: Sequelize.STRING },
                    VCA16_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA16_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA16_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA16_PROPOSED_VALUE_CHAIN", {
                    fields: ["VCA14_ACTIVITIES_D"],
                    type: "foreign key",
                    name: "VCA14_ACTIVITIES_PROPOSED_VALUE_CHAIN_D_FKEY",
                    references: {
                        table: "VCA14_ACTIVITIES",
                        field: "VCA14_ACTIVITIES_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA16_PROPOSED_VALUE_CHAIN", ["VCA16_STATUS_D"], {
                    name: "VCA16_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA16_PROPOSED_VALUE_CHAIN");
    },
};

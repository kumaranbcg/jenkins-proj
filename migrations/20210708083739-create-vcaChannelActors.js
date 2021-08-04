"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA27_CHANNEL_ACTORS",
                {
                    VCA27_CHANNEL_ACTORS_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA14_ACTIVITIES_D: { type: Sequelize.INTEGER },
                    VCA27_ACTOR_NAME_N: { type: Sequelize.STRING },
                    VCA27_CHANNEL_D: { type: Sequelize.INTEGER },
                    VCA27_STAGE_N: { type: Sequelize.STRING },
                    VCA27_PRICE_SPREAD_D: { type: Sequelize.INTEGER },
                    VCA27_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA27_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA27_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA27_CHANNEL_ACTORS", {
                    fields: ["VCA14_ACTIVITIES_D"],
                    type: "foreign key",
                    name: "VCA14_ACTIVITIES_CHANNEL_ACTORS_D_FKEY",
                    references: {
                        table: "VCA14_ACTIVITIES",
                        field: "VCA14_ACTIVITIES_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA27_CHANNEL_ACTORS", ["VCA27_STATUS_D"], {
                    name: "VCA27_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA27_CHANNEL_ACTORS");
    },
};

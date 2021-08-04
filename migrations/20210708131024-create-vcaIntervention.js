"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA17_INTERVENTION",
                {
                    VCA17_INTERVENTION_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA14_ACTIVITIES_D: { type: Sequelize.INTEGER },
                    VCA17_INTERVENTION_NAME_N: { type: Sequelize.STRING },
                    VCA06_STAGE_MASTER_D: { type: Sequelize.INTEGER },
                    VCA17_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA17_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA17_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA17_INTERVENTION", {
                    fields: ["VCA14_ACTIVITIES_D"],
                    type: "foreign key",
                    name: "VCA14_ACTIVITIES_INTERVENTION_D_FKEY",
                    references: {
                        table: "VCA14_ACTIVITIES",
                        field: "VCA14_ACTIVITIES_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA17_INTERVENTION", {
                    fields: ["VCA06_STAGE_MASTER_D"],
                    type: "foreign key",
                    name: "VCA06_STAGE_MASTER_INTERVENTION_D_FKEY",
                    references: {
                        table: "VCA06_STAGE_MASTER",
                        field: "VCA06_STAGE_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA17_INTERVENTION", ["VCA17_STATUS_D"], {
                    name: "VCA17_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA17_INTERVENTION");
    },
};

"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA09_OVERVIEW",
                {
                    VCA09_OVERVIEW_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA09_DESCRIPTION_D: { type: Sequelize.STRING },
                    VCA02_COMMODITY_MASTER_D: { type: Sequelize.INTEGER },
                    VCA09_IS_FILLED_D: { type: Sequelize.BOOLEAN, defaultValue: 0 },
                    VCA09_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA09_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA09_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA09_OVERVIEW", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_OVERVIEW_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA09_OVERVIEW", {
                    fields: ["VCA02_COMMODITY_MASTER_D"],
                    type: "foreign key",
                    name: "VCA02_COMMODITY_MASTER_OVERVIEW_D_FKEY",
                    references: {
                        table: "VCA02_COMMODITY_MASTER",
                        field: "VCA02_COMMODITY_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA09_OVERVIEW", ["VCA09_IS_FILLED_D"], {
                    name: "VCA09_IS_FILLED_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA09_OVERVIEW", ["VCA09_STATUS_D"], {
                    name: "VCA09_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA09_OVERVIEW");
    },
};

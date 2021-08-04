"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA12_COMMODITY_DETAILS",
                {
                    VCA12_COMMODITY_DETAILS_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA12_2015_2016_D: { type: Sequelize.INTEGER },
                    VCA12_2016_2017_D: { type: Sequelize.INTEGER },
                    VCA12_2017_2018_D: { type: Sequelize.INTEGER },
                    VCA12_2018_2019_D: { type: Sequelize.INTEGER },
                    VCA12_2019_2020_D: { type: Sequelize.INTEGER },
                    VCA05_UNITS_MASTER_D: { type: Sequelize.INTEGER },
                    VCA12_TYPE_D: { type: Sequelize.INTEGER },
                    VCA12_KEY_N: { type: Sequelize.STRING },
                    VCA12_IS_FILLED_D: { type: Sequelize.BOOLEAN, defaultValue: 0 },
                    VCA12_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA12_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA12_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA12_COMMODITY_DETAILS", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_COMMODITY_DETAILS_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA12_COMMODITY_DETAILS", {
                    fields: ["VCA05_UNITS_MASTER_D"],
                    type: "foreign key",
                    name: "VCA05_UNITS_MASTER_COMMODITY_DETAILS_D_FKEY",
                    references: {
                        table: "VCA05_UNITS_MASTER",
                        field: "VCA05_UNITS_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA12_COMMODITY_DETAILS", ["VCA12_TYPE_D"], {
                    name: "VCA12_TYPE_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA12_COMMODITY_DETAILS", ["VCA12_IS_FILLED_D"], {
                    name: "VCA12_IS_FILLED_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA12_COMMODITY_DETAILS", ["VCA12_STATUS_D"], {
                    name: "VCA12_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA12_COMMODITY_DETAILS");
    },
};

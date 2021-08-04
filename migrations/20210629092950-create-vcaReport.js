"use strict";
const { VCA_REPORT_STATUS } = require("../constants");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA08_REPORT",
                {
                    VCA08_REPORT_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_VERSION_D: { type: Sequelize.FLOAT(100, 1) },
                    VCA01_ACTIVITY_MASTER_D: { type: Sequelize.INTEGER },
                    VCA02_COMMODITY_MASTER_D: { type: Sequelize.INTEGER },
                    VCA08_APPLICATION_STATUS_D: {
                        type: Sequelize.INTEGER,
                        defaultValue: VCA_REPORT_STATUS.DRAFT,
                    },
                    VCA08_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA08_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA08_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                    VCA08_CREATED_D: { type: Sequelize.INTEGER },
                    VCA08_UPDATED_D: { type: Sequelize.INTEGER },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA08_REPORT", ["VCA08_VERSION_D"], {
                    name: "VCA08_VERSION_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA08_REPORT", {
                    fields: ["VCA01_ACTIVITY_MASTER_D"],
                    type: "foreign key",
                    name: "VCA01_ACTIVITY_MASTER_REPORT_D_FKEY",
                    references: {
                        table: "VCA01_ACTIVITY_MASTER",
                        field: "VCA01_ACTIVITY_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA08_REPORT", {
                    fields: ["VCA02_COMMODITY_MASTER_D"],
                    type: "foreign key",
                    name: "VCA02_COMMODITY_MASTER_REPORT_D_FKEY",
                    references: {
                        table: "VCA02_COMMODITY_MASTER",
                        field: "VCA02_COMMODITY_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA08_REPORT", ["VCA08_APPLICATION_STATUS_D"], {
                    name: "VCA08_APPLICATION_STATUS_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA08_REPORT", ["VCA08_STATUS_D"], {
                    name: "VCA08_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA08_REPORT");
    },
};

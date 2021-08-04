"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA22_REPORT_STATUS",
                {
                    VCA22_REPORT_STATUS_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA22_APPLICATION_STATUS_D: { type: Sequelize.INTEGER },
                    VCA22_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA22_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA22_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                    VCA22_CREATED_D: { type: Sequelize.INTEGER },
                    VCA22_UPDATED_D: { type: Sequelize.INTEGER },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA22_REPORT_STATUS", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_REPORT_STATUS_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA22_REPORT_STATUS", ["VCA22_APPLICATION_STATUS_D"], {
                    name: "VCA22_APPLICATION_STATUS_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA22_REPORT_STATUS", ["VCA22_STATUS_D"], {
                    name: "VCA22_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA22_REPORT_STATUS");
    },
};

"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA20_SWOT_ANALYSIS",
                {
                    VCA20_SWOT_ANALYSIS_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA20_STRENGTH_N: { type: Sequelize.TEXT },
                    VCA20_WEEKNESS_N: { type: Sequelize.TEXT },
                    VCA20_OPPORTUNITY_N: { type: Sequelize.TEXT },
                    VCA20_THREATS_N: { type: Sequelize.TEXT },
                    VCA20_IF_ANY_OTHER_N: { type: Sequelize.TEXT },
                    VCA20_IS_FILLED_D: { type: Sequelize.BOOLEAN, defaultValue: 0 },
                    VCA20_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA20_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA20_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA20_SWOT_ANALYSIS", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_SWOT_ANALYSIS_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA20_SWOT_ANALYSIS", ["VCA20_IS_FILLED_D"], {
                    name: "VCA20_IS_FILLED_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA20_SWOT_ANALYSIS", ["VCA20_STATUS_D"], {
                    name: "VCA20_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA20_SWOT_ANALYSIS");
    },
};

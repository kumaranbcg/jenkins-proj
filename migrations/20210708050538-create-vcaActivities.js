"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA14_ACTIVITIES",
                {
                    VCA14_ACTIVITIES_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA14_2015_2016_D: { type: Sequelize.INTEGER },
                    VCA14_2016_2017_D: { type: Sequelize.INTEGER },
                    VCA14_2017_2018_D: { type: Sequelize.INTEGER },
                    VCA14_2018_2019_D: { type: Sequelize.INTEGER },
                    VCA14_2019_2020_D: { type: Sequelize.INTEGER },
                    VCA14_VALUE_ADDED_PRODUCTS_N: { type: Sequelize.STRING },
                    VCA14_PRE_PRODUCTION_ISSUES_N: { type: Sequelize.STRING },
                    VCA14_PRODUCTION_ISSUES_N: { type: Sequelize.STRING },
                    VCA14_POST_PRODUCTION_ISSUES_N: { type: Sequelize.STRING },
                    VCA14_PROCESSING_ISSUES_N: { type: Sequelize.STRING },
                    VCA14_MARKETING_ISSUES_N: { type: Sequelize.STRING },
                    VCA14_MAJOR_FORM_COMMODITIES_N: { type: Sequelize.STRING },
                    VCA14_IS_FILLED_D: { type: Sequelize.BOOLEAN, defaultValue: 0 },
                    VCA14_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA14_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA14_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA14_ACTIVITIES", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_ACTIVITIES_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA14_ACTIVITIES", ["VCA14_IS_FILLED_D"], {
                    name: "VCA14_IS_FILLED_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA14_ACTIVITIES", ["VCA14_STATUS_D"], {
                    name: "VCA14_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA14_ACTIVITIES");
    },
};

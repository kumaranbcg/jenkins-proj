"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA13_GROUP_DETAILS",
                {
                    VCA13_GROUP_DETAILS_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA13_NO_OF_PG_D: { type: Sequelize.INTEGER },
                    VCA13_PRODUCERS_IN_PG_D: { type: Sequelize.INTEGER },
                    VCA13_NO_OF_EG_D: { type: Sequelize.INTEGER },
                    VCA13_MEMBERS_IN_EG_D: { type: Sequelize.INTEGER },
                    VCA13_NO_OF_PC_D: { type: Sequelize.INTEGER },
                    VCA13_PRODUCERS_IN_PC_D: { type: Sequelize.INTEGER },
                    VCA13_PC_ROLES_N: { type: Sequelize.STRING },
                    VCA13_PG_TO_BE_FORMED_D: { type: Sequelize.INTEGER },
                    VCA13_EG_TO_BE_FORMED_D: { type: Sequelize.INTEGER },
                    VCA13_PC_TO_BE_FORMED_D: { type: Sequelize.INTEGER },
                    VCA13_IS_FILLED_D: { type: Sequelize.BOOLEAN, defaultValue: 0 },
                    VCA13_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA13_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA13_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA13_GROUP_DETAILS", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_GROUP_DETAILS_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA13_GROUP_DETAILS", ["VCA13_IS_FILLED_D"], {
                    name: "VCA13_IS_FILLED_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA13_GROUP_DETAILS", ["VCA13_STATUS_D"], {
                    name: "VCA13_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA13_GROUP_DETAILS");
    },
};

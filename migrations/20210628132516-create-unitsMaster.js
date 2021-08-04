"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA05_UNITS_MASTER",
                {
                    VCA05_UNITS_MASTER_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false,
                    },
                    VCA05_UNITS_NAME_N: { type: Sequelize.STRING },
                    VCA05_UNITS_DESCRIPTION_N: { type: Sequelize.STRING },
                    VCA05_REPORT_TYPE_N: { type: Sequelize.TEXT },
                    VCA05_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA05_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA05_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA05_UNITS_MASTER", ["VCA05_UNITS_NAME_N"], {
                    name: "VCA05_UNITS_NAME_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA05_UNITS_MASTER", ["VCA05_UNITS_DESCRIPTION_N"], {
                    name: "VCA05_UNITS_DESCRIPTION_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA05_UNITS_MASTER", ["VCA05_STATUS_D"], {
                    name: "VCA05_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA05_UNITS_MASTER");
    },
};

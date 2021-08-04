"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA01_ACTIVITY_MASTER",
                {
                    VCA01_ACTIVITY_MASTER_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false,
                    },
                    VCA01_ACTIVITY_NAME_N: { type: Sequelize.STRING },
                    VCA01_ACTIVITY_TAMIL_NAME_N: { type: Sequelize.STRING },
                    VCA01_REPORT_TYPE_N: { type: Sequelize.STRING },
                    VCA01_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA01_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA01_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA01_ACTIVITY_MASTER", ["VCA01_ACTIVITY_NAME_N"], {
                    name: "VCA01_ACTIVITY_NAME_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA01_ACTIVITY_MASTER", ["VCA01_REPORT_TYPE_N"], {
                    name: "VCA01_REPORT_TYPE_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA01_ACTIVITY_MASTER", ["VCA01_STATUS_D"], {
                    name: "VCA01_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA01_ACTIVITY_MASTER");
    },
};

"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA04_STATE_MASTER",
                {
                    VCA04_STATE_MASTER_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false,
                    },
                    VCA04_STATE_NAME_N: { type: Sequelize.STRING },
                    VCA04_STATE_TAMIL_NAME_N: { type: Sequelize.STRING },
                    VCA04_STATE_IMAGE_URL_N: { type: Sequelize.STRING },
                    VCA04_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA04_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA04_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA04_STATE_MASTER", ["VCA04_STATE_NAME_N"], {
                    name: "VCA04_STATE_NAME_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA04_STATE_MASTER", ["VCA04_STATUS_D"], {
                    name: "VCA04_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA04_STATE_MASTER");
    },
};

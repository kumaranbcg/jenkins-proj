"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA06_STAGE_MASTER",
                {
                    VCA06_STAGE_MASTER_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false,
                    },
                    VCA06_STAGE_NAME_N: { type: Sequelize.STRING },
                    VCA06_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA06_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA06_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA06_STAGE_MASTER", ["VCA06_STAGE_NAME_N"], {
                    name: "VCA06_STAGE_NAME_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA06_STAGE_MASTER", ["VCA06_STATUS_D"], {
                    name: "VCA06_STATUS_D_KEY",
                })
            );
            
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA06_STAGE_MASTER");
    },
};

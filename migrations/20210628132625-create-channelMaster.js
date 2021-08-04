"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA07_CHANNEL_MASTER",
                {
                    VCA07_CHANNEL_MASTER_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false,
                    },
                    VCA07_CHANNEL_D: { type: Sequelize.INTEGER },
                    VCA07_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA07_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA07_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA07_CHANNEL_MASTER", ["VCA07_CHANNEL_D"], {
                    name: "VCA07_CHANNEL_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA07_CHANNEL_MASTER", ["VCA07_STATUS_D"], {
                    name: "VCA07_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA07_CHANNEL_MASTER");
    },
};

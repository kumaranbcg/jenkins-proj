"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA03_COUNTRY_MASTER",
                {
                    VCA03_COUNTRY_MASTER_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false,
                    },
                    VCA03_COUNTRY_NAME_N: { type: Sequelize.STRING },
                    VCA03_COUNTRY_TAMIL_NAME_N: { type: Sequelize.STRING },
                    VCA03_COUNTRY_IMAGE_URL_N: { type: Sequelize.STRING },
                    VCA03_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA03_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA03_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA03_COUNTRY_MASTER", ["VCA03_COUNTRY_NAME_N"], {
                    name: "VCA03_COUNTRY_NAME_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA03_COUNTRY_MASTER", ["VCA03_STATUS_D"], {
                    name: "VCA03_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA03_COUNTRY_MASTER");
    },
};

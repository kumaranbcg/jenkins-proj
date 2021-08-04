"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA02_COMMODITY_MASTER",
                {
                    VCA02_COMMODITY_MASTER_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false,
                    },
                    VCA01_ACTIVITY_MASTER_D: { type: Sequelize.INTEGER },
                    VCA02_COMMODITY_NAME_N: { type: Sequelize.STRING },
                    VCA02_COMMODITY_TAMIL_NAME_N: { type: Sequelize.STRING },
                    VCA02_REPORT_TYPE_N: { type: Sequelize.STRING },
                    VCA02_IS_REPORT_D: { type: Sequelize.BOOLEAN, defaultValue: 0 },
                    VCA02_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA02_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA02_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA02_COMMODITY_MASTER", ["VCA02_COMMODITY_NAME_N"], {
                    name: "VCA02_COMMODITY_NAME_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA02_COMMODITY_MASTER", ["VCA02_REPORT_TYPE_N"], {
                    name: "VCA02_REPORT_TYPE_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA02_COMMODITY_MASTER", ["VCA02_IS_REPORT_D"], {
                    name: "VCA02_IS_REPORT_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA02_COMMODITY_MASTER", ["VCA02_STATUS_D"], {
                    name: "VCA02_STATUS_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA02_COMMODITY_MASTER", {
                    fields: ["VCA01_ACTIVITY_MASTER_D"],
                    type: "foreign key",
                    name: "VCA01_ACTIVITY_MASTER_COMMODITY_D_FKEY",
                    references: {
                        table: "VCA01_ACTIVITY_MASTER",
                        field: "VCA01_ACTIVITY_MASTER_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA02_COMMODITY_MASTER");
    },
};

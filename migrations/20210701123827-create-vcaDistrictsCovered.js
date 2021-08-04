"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA11_DISTRICTS_COVERED",
                {
                    VCA11_DISTRICTS_COVERED_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA11_NO_OF_DISTRICTS_D: { type: Sequelize.INTEGER },
                    VCA11_NO_OF_BLOCKS_D: { type: Sequelize.INTEGER },
                    VCA11_NO_OF_TNRTP_DISTRICTS_D: { type: Sequelize.INTEGER },
                    VCA11_NO_OF_TNRTP_BLOCKS_D: { type: Sequelize.INTEGER },
                    VCA11_VARITEY_TYPES_N: { type: Sequelize.TEXT },
                    VCA11_IS_FILLED_D: { type: Sequelize.BOOLEAN, defaultValue: 0 },
                    VCA11_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA11_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA11_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA11_DISTRICTS_COVERED", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_DISTRICTS_COVERED_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA11_DISTRICTS_COVERED", ["VCA11_IS_FILLED_D"], {
                    name: "VCA11_IS_FILLED_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA11_DISTRICTS_COVERED", ["VCA11_STATUS_D"], {
                    name: "VCA11_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA11_DISTRICTS_COVERED");
    },
};

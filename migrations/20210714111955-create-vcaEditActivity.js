"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA26_EDIT_ACTIVITY",
                {
                    VCA26_EDIT_ACTIVITY_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA26_SECTION_N: { type: Sequelize.STRING },
                    VCA26_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA26_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA26_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                    VCA26_CREATED_D: { type: Sequelize.INTEGER },
                    VCA26_UPDATED_D: { type: Sequelize.INTEGER },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA26_EDIT_ACTIVITY", ["VCA26_STATUS_D"], {
                    name: "VCA26_STATUS_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA26_EDIT_ACTIVITY", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_EDIT_ACTIVITY_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA26_EDIT_ACTIVITY");
    },
};

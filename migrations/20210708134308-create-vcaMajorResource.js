"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA18_MAJOR_RESOURCE",
                {
                    VCA18_MAJOR_RESOURCE_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA14_ACTIVITIES_D: { type: Sequelize.INTEGER },
                    VCA18_INSTITUTION_DEPARTMENT_N: { type: Sequelize.STRING },
                    VCA18_LOCATION_N: { type: Sequelize.STRING },
                    VCA18_KEY_N: { type: Sequelize.STRING },
                    VCA18_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA18_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA18_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA18_MAJOR_RESOURCE", {
                    fields: ["VCA14_ACTIVITIES_D"],
                    type: "foreign key",
                    name: "VCA14_ACTIVITIES_MAJOR_RESOURCE_D_FKEY",
                    references: {
                        table: "VCA14_ACTIVITIES",
                        field: "VCA14_ACTIVITIES_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA18_MAJOR_RESOURCE", ["VCA18_STATUS_D"], {
                    name: "VCA18_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA18_MAJOR_RESOURCE");
    },
};

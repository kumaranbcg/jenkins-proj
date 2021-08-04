"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA19_LINKAGES",
                {
                    VCA19_LINKAGES_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA14_ACTIVITIES_D: { type: Sequelize.INTEGER },
                    VCA19_RECOMMENDED_LINKAGE_N: { type: Sequelize.STRING },
                    VCA19_INSTITUTION_DEPARMENT_N: { type: Sequelize.STRING },
                    VCA19_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA19_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA19_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA19_LINKAGES", {
                    fields: ["VCA14_ACTIVITIES_D"],
                    type: "foreign key",
                    name: "VCA14_ACTIVITIES_LINKAGES_D_FKEY",
                    references: {
                        table: "VCA14_ACTIVITIES",
                        field: "VCA14_ACTIVITIES_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA19_LINKAGES", ["VCA19_STATUS_D"], {
                    name: "VCA19_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA19_LINKAGES");
    },
};

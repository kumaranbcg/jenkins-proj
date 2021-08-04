"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA23_COMMENTS",
                {
                    VCA23_COMMENTS_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA23_COMMENT_N: { type: Sequelize.TEXT },
                    VCA23_ROLE_D: { type: Sequelize.INTEGER },
                    VCA23_REPLY_COMMENT_D: { type: Sequelize.INTEGER },
                    VCA23_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA23_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA23_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                    VCA23_CREATED_D: { type: Sequelize.INTEGER },
                    VCA23_UPDATED_D: { type: Sequelize.INTEGER },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA23_COMMENTS", ["VCA23_STATUS_D"], {
                    name: "VCA23_STATUS_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA23_COMMENTS", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_COMMENTS_D_FKEY",
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
        await queryInterface.dropTable("VCA23_COMMENTS");
    },
};

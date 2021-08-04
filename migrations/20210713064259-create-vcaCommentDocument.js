"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA24_COMMENT_DOCUMENT",
                {
                    VCA24_COMMENT_DOCUMENT_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA23_COMMENTS_D: { type: Sequelize.INTEGER },
                    VCA24_DOCUMENT_URL_N: { type: Sequelize.TEXT },
                    VCA24_DOCUMENT_NAME_N: { type: Sequelize.STRING },
                    VCA24_TYPE_D: { type: Sequelize.INTEGER },
                    VCA24_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA24_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA24_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA24_COMMENT_DOCUMENT", ["VCA24_TYPE_D"], {
                    name: "VCA24_TYPE_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA24_COMMENT_DOCUMENT", ["VCA24_STATUS_D"], {
                    name: "VCA24_STATUS_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA24_COMMENT_DOCUMENT", {
                    fields: ["VCA23_COMMENTS_D"],
                    type: "foreign key",
                    name: "VCA23_COMMENTS_DOCUMENT_D_FKEY",
                    references: {
                        table: "VCA23_COMMENTS",
                        field: "VCA23_COMMENTS_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA24_COMMENT_DOCUMENT");
    },
};

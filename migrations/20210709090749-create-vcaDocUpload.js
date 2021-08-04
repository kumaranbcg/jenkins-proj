"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA21_DOCUMENT_UPLOAD",
                {
                    VCA21_DOCUMENT_UPLOAD_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA21_DOCUMENT_TITLE_N: { type: Sequelize.STRING },
                    VCA21_AUTHOR_NAME_N: { type: Sequelize.STRING },
                    VCA21_PUBLISHED_AT: { type: Sequelize.DATE },
                    VCA21_APPROVAL_AT: { type: Sequelize.DATE },
                    VCA21_VERSION_D: { type: Sequelize.FLOAT(100, 1) },
                    VCA21_NO_OF_PAGES_D: { type: Sequelize.INTEGER },
                    VCA21_KEYWORDS_N: { type: Sequelize.STRING },
                    VCA21_NATURE_OF_INFORMATION_N: { type: Sequelize.TEXT },
                    VCA21_DOCUMENT_NAME_N: { type: Sequelize.STRING },
                    VCA21_DOCUMENT_UPLOAD_NAME_N: { type: Sequelize.TEXT },
                    VCA21_IS_FILLED_D: { type: Sequelize.BOOLEAN, defaultValue: 0 },
                    VCA21_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA21_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA21_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA21_DOCUMENT_UPLOAD", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_DOCUMENT_UPLOAD_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA21_DOCUMENT_UPLOAD", ["VCA21_DOCUMENT_TITLE_N"], {
                    name: "VCA21_DOCUMENT_TITLE_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA21_DOCUMENT_UPLOAD", ["VCA21_AUTHOR_NAME_N"], {
                    name: "VCA21_AUTHOR_NAME_N_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA21_DOCUMENT_UPLOAD", ["VCA21_VERSION_D"], {
                    name: "VCA21_VERSION_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA21_DOCUMENT_UPLOAD", ["VCA21_IS_FILLED_D"], {
                    name: "VCA21_IS_FILLED_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA21_DOCUMENT_UPLOAD", ["VCA21_STATUS_D"], {
                    name: "VCA21_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA21_DOCUMENT_UPLOAD");
    },
};

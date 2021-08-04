"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA25_COMMENTS_READ",
                {
                    VCA25_COMMENTS_READ_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    TNRTP18_ROLE_MASTER_D: { type: Sequelize.INTEGER },
                    VCA25_LAST_READ_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA25_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA25_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA25_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addIndex("VCA25_COMMENTS_READ", ["VCA25_STATUS_D"], {
                    name: "VCA25_STATUS_D_KEY",
                })
            )
            .then(() =>
                queryInterface.sequelize.query(
                    "ALTER TABLE `VCA25_COMMENTS_READ` ADD CONSTRAINT `VCA25_COMMENTS_READ_BLOCK_MASTER_D_FKEY` FOREIGN KEY (`TNRTP18_ROLE_MASTER_D`) REFERENCES `TNRTP`.`TNRTP18_ROLE_MASTER`(`TNRTP18_ROLE_MASTER_D`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                )
            )
            .then(() =>
                queryInterface.addConstraint("VCA25_COMMENTS_READ", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA25_COMMENTS_READ_FKEY",
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
        await queryInterface.dropTable("VCA25_COMMENTS_READ");
    },
};

"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "VCA10_GEOGRAPHY",
                {
                    VCA10_GEOGRAPHY_D: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    VCA08_REPORT_D: { type: Sequelize.INTEGER },
                    VCA03_COUNTRY_MASTER_D: { type: Sequelize.INTEGER },
                    VCA10_COUNTRY_CULTIVATION_AREA_D: { type: Sequelize.BIGINT },
                    VCA10_COUNTRY_CULTIVATION_AREA_UNIT_D: { type: Sequelize.INTEGER },
                    VCA10_COUNTRY_PRODUCTION_PERCENT_D: { type: Sequelize.INTEGER },
                    VCA10_COUNTRY_PRODUCTION_VOLUME_D: { type: Sequelize.INTEGER },
                    VCA10_COUNTRY_PRODUCTION_VOLUME_UNIT_D: { type: Sequelize.INTEGER },
                    VCA10_INDIA_RANKING_D: { type: Sequelize.INTEGER },
                    VCA04_STATE_MASTER_D: { type: Sequelize.INTEGER },
                    VCA10_STATE_CULTIVATION_AREA_D: { type: Sequelize.BIGINT },
                    VCA10_STATE_CULTIVATION_AREA_UNIT_D: { type: Sequelize.INTEGER },
                    VCA10_STATE_PRODUCTION_PERCENT_D: { type: Sequelize.INTEGER },
                    VCA10_STATE_PRODUCTION_VOLUME_D: { type: Sequelize.INTEGER },
                    VCA10_STATE_PRODUCTION_VOLUME_UNIT_D: { type: Sequelize.INTEGER },
                    VCA10_TAMIL_NADU_RANKING_D: { type: Sequelize.INTEGER },
                    TNRTP07_DISTRICT_MASTER_D: { type: Sequelize.INTEGER },
                    VCA10_DISTRICT_CULTIVATION_AREA_D: { type: Sequelize.BIGINT },
                    VCA10_DISTRICT_CULTIVATION_AREA_UNIT_D: { type: Sequelize.INTEGER },
                    VCA10_DISTRICT_PRODUCTION_PERCENT_D: { type: Sequelize.INTEGER },
                    VCA10_DISTRICT_PRODUCTION_VOLUME_D: { type: Sequelize.INTEGER },
                    VCA10_DISTRICT_PRODUCTION_VOLUME_UNIT_D: { type: Sequelize.INTEGER },
                    VCA10_IS_FILLED_D: { type: Sequelize.BOOLEAN, defaultValue: 0 },
                    VCA10_STATUS_D: { type: Sequelize.BOOLEAN, defaultValue: 1 },
                    VCA10_CREATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
                    },
                    VCA10_UPDATED_AT: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal(
                            "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
                        ),
                    },
                },
                { timestamps: false }
            )
            .then(() =>
                queryInterface.addConstraint("VCA10_GEOGRAPHY", {
                    fields: ["VCA08_REPORT_D"],
                    type: "foreign key",
                    name: "VCA08_REPORT_GEOGRAPHY_D_FKEY",
                    references: {
                        table: "VCA08_REPORT",
                        field: "VCA08_REPORT_D",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA10_GEOGRAPHY", {
                    fields: ["VCA03_COUNTRY_MASTER_D"],
                    type: "foreign key",
                    name: "VCA03_COUNTRY_MASTER_GEOGRAPHY_D_FKEY",
                    references: {
                        table: "VCA03_COUNTRY_MASTER",
                        field: "VCA03_COUNTRY_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA10_GEOGRAPHY", {
                    fields: ["VCA10_COUNTRY_CULTIVATION_AREA_UNIT_D"],
                    type: "foreign key",
                    name: "VCA10_COUNTRY_UNIT_GEOGRAPHY_D_FKEY",
                    references: {
                        table: "VCA05_UNITS_MASTER",
                        field: "VCA05_UNITS_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA10_GEOGRAPHY", {
                    fields: ["VCA10_COUNTRY_PRODUCTION_VOLUME_UNIT_D"],
                    type: "foreign key",
                    name: "VCA10_COUNTRY_PRODUCTION_VOLUME_UNIT_GEOGRAPHY_D_FKEY",
                    references: {
                        table: "VCA05_UNITS_MASTER",
                        field: "VCA05_UNITS_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA10_GEOGRAPHY", {
                    fields: ["VCA04_STATE_MASTER_D"],
                    type: "foreign key",
                    name: "VCA04_STATE_MASTER_GEOGRAPHY_D_FKEY",
                    references: {
                        table: "VCA04_STATE_MASTER",
                        field: "VCA04_STATE_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA10_GEOGRAPHY", {
                    fields: ["VCA10_STATE_CULTIVATION_AREA_UNIT_D"],
                    type: "foreign key",
                    name: "VCA10_STATE_CULTIVATION_AREA_UNIT_GEOGRAPHY_D_FKEY",
                    references: {
                        table: "VCA05_UNITS_MASTER",
                        field: "VCA05_UNITS_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA10_GEOGRAPHY", {
                    fields: ["VCA10_STATE_PRODUCTION_VOLUME_UNIT_D"],
                    type: "foreign key",
                    name: "VCA10_STATE_PRODUCTION_VOLUME_UNIT_GEOGRAPHY_D_FKEY",
                    references: {
                        table: "VCA05_UNITS_MASTER",
                        field: "VCA05_UNITS_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.sequelize.query(
                    "ALTER TABLE `VCA10_GEOGRAPHY` ADD CONSTRAINT `VCA10_GEOGRAPHY_DISTRICT_D_FKEY` FOREIGN KEY (`TNRTP07_DISTRICT_MASTER_D`) REFERENCES `TNRTP`.`TNRTP07_DISTRICT_MASTER`(`TNRTP07_DISTRICT_MASTER_D`) ON DELETE NO ACTION ON UPDATE NO ACTION"
                )
            )
            .then(() =>
                queryInterface.addConstraint("VCA10_GEOGRAPHY", {
                    fields: ["VCA10_DISTRICT_CULTIVATION_AREA_UNIT_D"],
                    type: "foreign key",
                    name: "VCA10_DISTRICT_CULTIVATION_AREA_UNIT_GEOGRAPHY_D_FKEY",
                    references: {
                        table: "VCA05_UNITS_MASTER",
                        field: "VCA05_UNITS_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addConstraint("VCA10_GEOGRAPHY", {
                    fields: ["VCA10_DISTRICT_PRODUCTION_VOLUME_UNIT_D"],
                    type: "foreign key",
                    name: "VCA10_DISTRICT_PRODUCTION_VOLUME_UNIT_GEOGRAPHY_D_FKEY",
                    references: {
                        table: "VCA05_UNITS_MASTER",
                        field: "VCA05_UNITS_MASTER_D",
                    },
                    onDelete: "no action",
                    onUpdate: "no action",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA10_GEOGRAPHY", ["VCA10_IS_FILLED_D"], {
                    name: "VCA10_IS_FILLED_D_KEY",
                })
            )
            .then(() =>
                queryInterface.addIndex("VCA10_GEOGRAPHY", ["VCA10_STATUS_D"], {
                    name: "VCA10_STATUS_D_KEY",
                })
            );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("VCA10_GEOGRAPHY");
    },
};

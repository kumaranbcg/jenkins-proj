"use strict";
const viewName = "VCA03_LATEST_STATUS_REPORT_VIEW";
const config = require("../config/config")[process.env.NODE_ENV];
let query =
    "SELECT `vcaReportView`.* FROM `VCA`.`VCA01_REPORT_VIEW` as `vcaReportView` INNER JOIN ( SELECT `VCA01_ACTIVITY_MASTER_D` as `activityId`, `VCA02_COMMODITY_MASTER_D` as `commodityId`, MAX(`VCA08_VERSION_D`) AS `version`, `VCA08_APPLICATION_STATUS_D` AS `applicationStatus` FROM `VCA`.`VCA08_REPORT` WHERE `VCA08_STATUS_D` = 1 GROUP BY `VCA01_ACTIVITY_MASTER_D`, `VCA02_COMMODITY_MASTER_D`, `VCA08_APPLICATION_STATUS_D` ) as `latestVersion` ON `vcaReportView`.`activityId` = `latestVersion`.`activityId` AND `vcaReportView`.`commodityId` = `latestVersion`.`commodityId` AND `vcaReportView`.`version` = `latestVersion`.`version` AND `vcaReportView`.`applicationStatus` = `latestVersion`.`applicationStatus`";
const regex = new RegExp("`VCA`", "g");
query = query.replace(regex, `\`${config.database}\``);
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${viewName} AS (${query})`);
    },
    down: async (queryInterface) => {
        await queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    },
};
/**
CREATE OR REPLACE VIEW `VCA03_LATEST_STATUS_REPORT_VIEW` AS (
    SELECT 
        `vcaReportView`.* 
    FROM `VCA`.`VCA01_REPORT_VIEW` as `vcaReportView`
    INNER JOIN (
        SELECT 
            `VCA01_ACTIVITY_MASTER_D` as `activityId`,
            `VCA02_COMMODITY_MASTER_D` as `commodityId`,
            MAX(`VCA08_VERSION_D`) AS `version`,
            `VCA08_APPLICATION_STATUS_D` AS `applicationStatus` 
        FROM `VCA`.`VCA08_REPORT`
        WHERE `VCA08_STATUS_D` = 1
        GROUP BY `VCA01_ACTIVITY_MASTER_D`, `VCA02_COMMODITY_MASTER_D`, `VCA08_APPLICATION_STATUS_D`
    ) as `latestVersion`
    ON `vcaReportView`.`activityId` = `latestVersion`.`activityId` AND `vcaReportView`.`commodityId` = `latestVersion`.`commodityId` AND `vcaReportView`.`version` = `latestVersion`.`version` AND `vcaReportView`.`applicationStatus` = `latestVersion`.`applicationStatus`
)
 */

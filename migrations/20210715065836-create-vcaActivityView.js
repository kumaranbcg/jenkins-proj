"use strict";
const viewName = "VCA04_ACTIVITY_VIEW";
const config = require("../config/config")[process.env.NODE_ENV];
let query =
    "SELECT `vcaActivity`.`reportId` as `reportId`, `vcaActivity`.`createdAt` as `createdAt`, `vcaActivity`.`message` as `message`, `vcaActivity`.`activityType` as `activityType`, `staffMaster`.`TNRTP06_USER_NAME_N` as `userName`, `roleMaster`.`TNRTP18_ROLE_NAME_N` as `roleName` FROM ( SELECT `VCA08_REPORT_D` as `reportId`, `VCA08_CREATED_AT` as `createdAt`, `VCA08_CREATED_D` as `createdBy`, null as `message`, 1 as `activityType` FROM `VCA08_REPORT` as `reportMaster` UNION SELECT `VCA08_REPORT_D` as `reportId`, `VCA26_CREATED_AT` as `createdAt`, `VCA26_CREATED_D` as `createdBy`, `VCA26_SECTION_N` as `message`, 2 as `activityType` FROM `VCA26_EDIT_ACTIVITY` UNION SELECT `VCA08_REPORT_D` as `reportId`, `VCA23_CREATED_AT` as `createdAt`, `VCA23_CREATED_D` as `createdBy`, `VCA23_COMMENT_N` as `message`, ( CASE WHEN `VCA23_REPLY_COMMENT_D` IS NULL THEN 3 ELSE 4 END ) as `activityType` FROM `VCA23_COMMENTS` UNION SELECT `VCA08_REPORT_D` as `reportId`, `VCA22_CREATED_AT` as `createdAt`, `VCA22_CREATED_D` as `createdBy`, null as `message`, ( CASE WHEN `VCA22_APPLICATION_STATUS_D` = 3 THEN 5 WHEN `VCA22_APPLICATION_STATUS_D` = 4 THEN 6 END ) as `activityType` FROM `VCA22_REPORT_STATUS` ) as `vcaActivity` LEFT JOIN `TNRTP`.`TNRTP06_STAFF_MASTER` as `staffMaster` ON `staffMaster`.`TNRTP06_STAFF_MASTER_D` = `vcaActivity`.`createdBy` LEFT JOIN `TNRTP`.`TNRTP18_ROLE_MASTER` as `roleMaster` ON `staffMaster`.`TNRTP06_NEW_ROLE_D` = `roleMaster`.`TNRTP18_ROLE_MASTER_D`";
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
CREATE OR REPLACE VIEW `VCA04_ACTIVITY_VIEW` AS (
    SELECT 
        `vcaActivity`.`reportId` as `reportId`,
        `vcaActivity`.`createdAt` as `createdAt`,
        `vcaActivity`.`message` as `message`,
        `vcaActivity`.`activityType` as `activityType`,
        `staffMaster`.`TNRTP06_USER_NAME_N` as `userName`,
        `roleMaster`.`TNRTP18_ROLE_NAME_N` as `roleName`
    FROM (
        SELECT 
            `VCA08_REPORT_D` as `reportId`,
            `VCA08_CREATED_AT` as `createdAt`,
            `VCA08_CREATED_D` as `createdBy`,
            null as `message`,
            1 as `activityType`
        FROM `VCA08_REPORT` as `reportMaster`
        UNION
        SELECT 
            `VCA08_REPORT_D` as `reportId`,
            `VCA26_CREATED_AT` as `createdAt`,
            `VCA26_CREATED_D` as `createdBy`,
            `VCA26_SECTION_N` as `message`,
            2 as `activityType`
        FROM `VCA26_EDIT_ACTIVITY`
        UNION
        SELECT 
            `VCA08_REPORT_D` as `reportId`,
            `VCA23_CREATED_AT` as `createdAt`,
            `VCA23_CREATED_D` as `createdBy`,
            `VCA23_COMMENT_N` as `message`,
            (
                CASE 
                    WHEN `VCA23_REPLY_COMMENT_D` IS NULL THEN 3
                    ELSE 4
                END
            ) as `activityType`
        FROM `VCA23_COMMENTS`
        UNION 
        SELECT 
            `VCA08_REPORT_D` as `reportId`,
            `VCA22_CREATED_AT` as `createdAt`,
            `VCA22_CREATED_D` as `createdBy`,
            null as `message`,
            (
                CASE 
                    WHEN `VCA22_APPLICATION_STATUS_D` = 3 THEN 5
                    WHEN `VCA22_APPLICATION_STATUS_D` = 4 THEN 6
                END
            ) as `activityType`
        FROM `VCA22_REPORT_STATUS`
    ) as `vcaActivity`
    LEFT JOIN `TNRTP`.`TNRTP06_STAFF_MASTER` as `staffMaster`
    ON `staffMaster`.`TNRTP06_STAFF_MASTER_D` = `vcaActivity`.`createdBy`
    LEFT JOIN `TNRTP`.`TNRTP18_ROLE_MASTER` as `roleMaster`
    ON `staffMaster`.`TNRTP06_NEW_ROLE_D` = `roleMaster`.`TNRTP18_ROLE_MASTER_D`
)
 */

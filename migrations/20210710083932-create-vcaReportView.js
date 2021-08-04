"use strict";
const viewName = "VCA01_REPORT_VIEW";
const config = require("../config/config")[process.env.NODE_ENV];
let query =
    "SELECT `reportMaster`.`VCA08_REPORT_D` as `reportId`, `staffMaster`.`TNRTP06_NEW_ROLE_D` as `roleId`, `districtMaster`.`TNRTP07_DISTRICT_MASTER_D` as `districtId`, `vcaDocUpload`.`VCA21_DOCUMENT_TITLE_N` as `documentTitle`, IFNULL( `commodityMaster`.`VCA02_REPORT_TYPE_N`, `activityMaster`.`VCA01_REPORT_TYPE_N` ) as `reportType`, LENGTH( REPLACE( ( CASE WHEN `reportMaster`.`VCA01_ACTIVITY_MASTER_D` = 1 OR `reportMaster`.`VCA02_COMMODITY_MASTER_D` IN (98,106) THEN ( CONCAT_WS( ',', (CASE WHEN `vcaOverview`.`VCA09_IS_FILLED_D` THEN 1 END), (CASE WHEN `vcaGeography`.`VCA10_IS_FILLED_D` THEN 2 END), (CASE WHEN `vcaDistrictsCovered`.`VCA11_IS_FILLED_D` THEN 3 END), (CASE WHEN `vcaCommodityDetails`.`VCA12_IS_FILLED_D` THEN 4 END), (CASE WHEN `vcaGroupDetails`.`VCA13_IS_FILLED_D` THEN 5 END), (CASE WHEN `vcaActivities`.`VCA14_IS_FILLED_D` THEN 6 END), (CASE WHEN `vcaSwotAnalysis`.`VCA20_IS_FILLED_D` THEN 7 END), (CASE WHEN `vcaDocUpload`.`VCA21_IS_FILLED_D` THEN 8 END) ) ) END ), ',', '' ) ) as `filled`, ( CASE WHEN `reportMaster`.`VCA01_ACTIVITY_MASTER_D` = 1 THEN 8 END ) as `totalSection`, ( CASE WHEN `reportMaster`.`VCA01_ACTIVITY_MASTER_D` = 1 OR `reportMaster`.`VCA02_COMMODITY_MASTER_D` IN (98,106) THEN ( CONCAT_WS( ',', (CASE WHEN `vcaOverview`.`VCA09_IS_FILLED_D` THEN 1 END), (CASE WHEN `vcaGeography`.`VCA10_IS_FILLED_D` THEN 2 END), (CASE WHEN `vcaDistrictsCovered`.`VCA11_IS_FILLED_D` THEN 3 END), (CASE WHEN `vcaCommodityDetails`.`VCA12_IS_FILLED_D` THEN 4 END), (CASE WHEN `vcaGroupDetails`.`VCA13_IS_FILLED_D` THEN 5 END), (CASE WHEN `vcaActivities`.`VCA14_IS_FILLED_D` THEN 6 END), (CASE WHEN `vcaSwotAnalysis`.`VCA20_IS_FILLED_D` THEN 7 END), (CASE WHEN `vcaDocUpload`.`VCA21_IS_FILLED_D` THEN 8 END) ) ) END ) as `sectionsFilled`, `reportMaster`.`VCA08_APPLICATION_STATUS_D` as `applicationStatus`, `activityMaster`.`VCA01_ACTIVITY_MASTER_D` as `activityId`, `commodityMaster`.`VCA02_COMMODITY_MASTER_D` as `commodityId`, `reportMaster`.`VCA08_CREATED_AT` as `uploadedOn`, `activityMaster`.`VCA01_ACTIVITY_NAME_N` as `activityName`, `commodityMaster`.`VCA02_COMMODITY_NAME_N` as `commodityName`, `vcaReportStatus`.`VCA22_CREATED_AT` as `approvedOn`, `staffMaster`.`TNRTP06_USER_NAME_N` as `uploadedBy`, `districtMaster`.`TNRTP07_DISTRICT_NAME` as `districtName`, CAST(`reportMaster`.`VCA08_VERSION_D` AS DECIMAL(10,1)) as `version`, ( CASE WHEN `reportMaster`.`VCA08_APPLICATION_STATUS_D` = 1 THEN 'Draft' WHEN `reportMaster`.`VCA08_APPLICATION_STATUS_D` = 2 THEN 'In Progress' WHEN `reportMaster`.`VCA08_APPLICATION_STATUS_D` = 3 THEN 'Reviewed' WHEN `reportMaster`.`VCA08_APPLICATION_STATUS_D` = 4 THEN 'Approved' END ) as `applicationStatusLabel` FROM `VCA`.`VCA08_REPORT` as `reportMaster` LEFT JOIN `VCA`.`VCA01_ACTIVITY_MASTER` as `activityMaster` ON `reportMaster`.`VCA01_ACTIVITY_MASTER_D` = `activityMaster`.`VCA01_ACTIVITY_MASTER_D` LEFT JOIN `VCA`.`VCA02_COMMODITY_MASTER` as `commodityMaster` ON `reportMaster`.`VCA02_COMMODITY_MASTER_D` = `commodityMaster`.`VCA02_COMMODITY_MASTER_D` LEFT JOIN `TNRTP`.`TNRTP06_STAFF_MASTER` as `staffMaster` ON `reportMaster`.`VCA08_CREATED_D` = `staffMaster`.`TNRTP06_STAFF_MASTER_D` LEFT JOIN `TNRTP`.`TNRTP12_STAFF_ADDRESS` as `staffAddress` ON `staffMaster`.`TNRTP06_STAFF_MASTER_D` = `staffAddress`.`TNRTP12_STAFF_MASTER_D` LEFT JOIN `TNRTP`.`TNRTP07_DISTRICT_MASTER` as `districtMaster` ON `staffAddress`.`TNRTP12_DISTRICT_MASTER_D` = `districtMaster`.`TNRTP07_DISTRICT_MASTER_D` LEFT JOIN `VCA`.`VCA09_OVERVIEW` as `vcaOverview` ON `reportMaster`.`VCA08_REPORT_D` = `vcaOverview`.`VCA08_REPORT_D` LEFT JOIN `VCA`.`VCA10_GEOGRAPHY` as `vcaGeography` ON `reportMaster`.`VCA08_REPORT_D` = `vcaGeography`.`VCA08_REPORT_D` LEFT JOIN `VCA`.`VCA11_DISTRICTS_COVERED` as `vcaDistrictsCovered` ON `reportMaster`.`VCA08_REPORT_D` = `vcaDistrictsCovered`.`VCA08_REPORT_D` LEFT JOIN `VCA`.`VCA12_COMMODITY_DETAILS` as `vcaCommodityDetails` ON `reportMaster`.`VCA08_REPORT_D` = `vcaCommodityDetails`.`VCA08_REPORT_D` LEFT JOIN `VCA`.`VCA13_GROUP_DETAILS` as `vcaGroupDetails` ON `reportMaster`.`VCA08_REPORT_D` = `vcaGroupDetails`.`VCA08_REPORT_D` LEFT JOIN `VCA`.`VCA14_ACTIVITIES` as `vcaActivities` ON `reportMaster`.`VCA08_REPORT_D` = `vcaActivities`.`VCA08_REPORT_D` LEFT JOIN `VCA`.`VCA20_SWOT_ANALYSIS` as `vcaSwotAnalysis` ON `reportMaster`.`VCA08_REPORT_D` = `vcaSwotAnalysis`.`VCA08_REPORT_D` LEFT JOIN `VCA`.`VCA21_DOCUMENT_UPLOAD` as `vcaDocUpload` ON `reportMaster`.`VCA08_REPORT_D` = `vcaDocUpload`.`VCA08_REPORT_D` LEFT JOIN `VCA`.`VCA22_REPORT_STATUS` as `vcaReportStatus` ON `reportMaster`.`VCA08_REPORT_D` = `vcaReportStatus`.`VCA08_REPORT_D` AND `vcaReportStatus`.`VCA22_APPLICATION_STATUS_D` = 4 WHERE `reportMaster`.`VCA08_STATUS_D` = 1 GROUP BY `reportMaster`.`VCA08_REPORT_D`";
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
CREATE OR REPLACE VIEW `VCA01_REPORT_VIEW` AS (
    SELECT 
        `reportMaster`.`VCA08_REPORT_D` as `reportId`,
        `staffMaster`.`TNRTP06_NEW_ROLE_D` as `roleId`,
        `districtMaster`.`TNRTP07_DISTRICT_MASTER_D` as `districtId`,
        `vcaDocUpload`.`VCA21_DOCUMENT_TITLE_N` as `documentTitle`,
        IFNULL(
            `commodityMaster`.`VCA02_REPORT_TYPE_N`, `activityMaster`.`VCA01_REPORT_TYPE_N`
        ) as `reportType`,
        LENGTH(
            REPLACE(
                (
                    CASE 
                        WHEN 
                            `reportMaster`.`VCA01_ACTIVITY_MASTER_D` = 1 
                            OR `reportMaster`.`VCA02_COMMODITY_MASTER_D` IN (98,106) THEN (
                            CONCAT_WS(
                                ',',
                                (CASE WHEN `vcaOverview`.`VCA09_IS_FILLED_D` THEN 1 END),
                                (CASE WHEN `vcaGeography`.`VCA10_IS_FILLED_D` THEN 2 END),
                                (CASE WHEN `vcaDistrictsCovered`.`VCA11_IS_FILLED_D` THEN 3 END),
                                (CASE WHEN `vcaCommodityDetails`.`VCA12_IS_FILLED_D` THEN 4 END),
                                (CASE WHEN `vcaGroupDetails`.`VCA13_IS_FILLED_D` THEN 5 END),
                                (CASE WHEN `vcaActivities`.`VCA14_IS_FILLED_D` THEN 6 END),
                                (CASE WHEN `vcaSwotAnalysis`.`VCA20_IS_FILLED_D` THEN 7 END),
                                (CASE WHEN `vcaDocUpload`.`VCA21_IS_FILLED_D` THEN 8 END)
                            )
                        )
                    END
                ), 
                ',', 
                ''
            )
        ) as `filled`,
        (
            CASE
                WHEN `reportMaster`.`VCA01_ACTIVITY_MASTER_D` = 1 THEN 8
            END
        ) as `totalSection`,
        (
            CASE 
                WHEN 
                    `reportMaster`.`VCA01_ACTIVITY_MASTER_D` = 1 
                    OR `reportMaster`.`VCA02_COMMODITY_MASTER_D` IN (98,106) THEN (
                    CONCAT_WS(
                        ',',
                        (CASE WHEN `vcaOverview`.`VCA09_IS_FILLED_D` THEN 1 END),
                        (CASE WHEN `vcaGeography`.`VCA10_IS_FILLED_D` THEN 2 END),
                        (CASE WHEN `vcaDistrictsCovered`.`VCA11_IS_FILLED_D` THEN 3 END),
                        (CASE WHEN `vcaCommodityDetails`.`VCA12_IS_FILLED_D` THEN 4 END),
                        (CASE WHEN `vcaGroupDetails`.`VCA13_IS_FILLED_D` THEN 5 END),
                        (CASE WHEN `vcaActivities`.`VCA14_IS_FILLED_D` THEN 6 END),
                        (CASE WHEN `vcaSwotAnalysis`.`VCA20_IS_FILLED_D` THEN 7 END),
                        (CASE WHEN `vcaDocUpload`.`VCA21_IS_FILLED_D` THEN 8 END)
                    )
                )
            END
        ) as `sectionsFilled`,
        `reportMaster`.`VCA08_APPLICATION_STATUS_D` as `applicationStatus`,
        `activityMaster`.`VCA01_ACTIVITY_MASTER_D` as `activityId`,
        `commodityMaster`.`VCA02_COMMODITY_MASTER_D` as `commodityId`,
        `reportMaster`.`VCA08_CREATED_AT` as `uploadedOn`,
        `activityMaster`.`VCA01_ACTIVITY_NAME_N` as `activityName`,
        `commodityMaster`.`VCA02_COMMODITY_NAME_N` as `commodityName`,
        `vcaReportStatus`.`VCA22_CREATED_AT` as `approvedOn`,
        `staffMaster`.`TNRTP06_USER_NAME_N` as `uploadedBy`,
        `districtMaster`.`TNRTP07_DISTRICT_NAME` as `districtName`,
        CAST(`reportMaster`.`VCA08_VERSION_D` AS DECIMAL(10,1)) as `version`,
        (
            CASE 
                WHEN `reportMaster`.`VCA08_APPLICATION_STATUS_D` = 1 THEN 'Draft'
                WHEN `reportMaster`.`VCA08_APPLICATION_STATUS_D` = 2 THEN 'In Progress'
                WHEN `reportMaster`.`VCA08_APPLICATION_STATUS_D` = 3 THEN 'Reviewed'
                WHEN `reportMaster`.`VCA08_APPLICATION_STATUS_D` = 4 THEN 'Approved'
            END
        ) as `applicationStatusLabel`
    FROM `VCA`.`VCA08_REPORT` as `reportMaster`
    LEFT JOIN `VCA`.`VCA01_ACTIVITY_MASTER` as `activityMaster`
    ON `reportMaster`.`VCA01_ACTIVITY_MASTER_D` = `activityMaster`.`VCA01_ACTIVITY_MASTER_D`
    LEFT JOIN `VCA`.`VCA02_COMMODITY_MASTER` as `commodityMaster`
    ON `reportMaster`.`VCA02_COMMODITY_MASTER_D` = `commodityMaster`.`VCA02_COMMODITY_MASTER_D`
    LEFT JOIN `TNRTP`.`TNRTP06_STAFF_MASTER` as `staffMaster`
    ON `reportMaster`.`VCA08_CREATED_D` = `staffMaster`.`TNRTP06_STAFF_MASTER_D`
    LEFT JOIN `TNRTP`.`TNRTP12_STAFF_ADDRESS` as `staffAddress`
    ON `staffMaster`.`TNRTP06_STAFF_MASTER_D` = `staffAddress`.`TNRTP12_STAFF_MASTER_D`
    LEFT JOIN `TNRTP`.`TNRTP07_DISTRICT_MASTER` as `districtMaster`
    ON `staffAddress`.`TNRTP12_DISTRICT_MASTER_D` = `districtMaster`.`TNRTP07_DISTRICT_MASTER_D`
    LEFT JOIN `VCA`.`VCA09_OVERVIEW` as `vcaOverview`
    ON `reportMaster`.`VCA08_REPORT_D` = `vcaOverview`.`VCA08_REPORT_D`
    LEFT JOIN `VCA`.`VCA10_GEOGRAPHY` as `vcaGeography`
    ON `reportMaster`.`VCA08_REPORT_D` = `vcaGeography`.`VCA08_REPORT_D`
    LEFT JOIN `VCA`.`VCA11_DISTRICTS_COVERED` as `vcaDistrictsCovered`
    ON `reportMaster`.`VCA08_REPORT_D` = `vcaDistrictsCovered`.`VCA08_REPORT_D`
    LEFT JOIN `VCA`.`VCA12_COMMODITY_DETAILS` as `vcaCommodityDetails`
    ON `reportMaster`.`VCA08_REPORT_D` = `vcaCommodityDetails`.`VCA08_REPORT_D`
    LEFT JOIN `VCA`.`VCA13_GROUP_DETAILS` as `vcaGroupDetails`
    ON `reportMaster`.`VCA08_REPORT_D` = `vcaGroupDetails`.`VCA08_REPORT_D`
    LEFT JOIN `VCA`.`VCA14_ACTIVITIES` as `vcaActivities`
    ON `reportMaster`.`VCA08_REPORT_D` = `vcaActivities`.`VCA08_REPORT_D`
    LEFT JOIN `VCA`.`VCA20_SWOT_ANALYSIS` as `vcaSwotAnalysis`
    ON `reportMaster`.`VCA08_REPORT_D` = `vcaSwotAnalysis`.`VCA08_REPORT_D`
    LEFT JOIN `VCA`.`VCA21_DOCUMENT_UPLOAD` as `vcaDocUpload`
    ON `reportMaster`.`VCA08_REPORT_D` = `vcaDocUpload`.`VCA08_REPORT_D`
    LEFT JOIN `VCA`.`VCA22_REPORT_STATUS` as `vcaReportStatus`
    ON `reportMaster`.`VCA08_REPORT_D` = `vcaReportStatus`.`VCA08_REPORT_D` AND `vcaReportStatus`.`VCA22_APPLICATION_STATUS_D` = 4
    WHERE `reportMaster`.`VCA08_STATUS_D` = 1
    GROUP BY `reportMaster`.`VCA08_REPORT_D`
)
 */

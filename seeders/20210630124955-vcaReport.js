"use strict";
const { VCA_REPORT_STATUS, DELETE_STATUS, COMMODITY_IDS } = require("../constants");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "VCA08_REPORT",
            [
                {
                    VCA08_APPLICATION_STATUS_D: VCA_REPORT_STATUS.DRAFT,
                    VCA08_STATUS_D: DELETE_STATUS.ACTIVE,
                    VCA01_ACTIVITY_MASTER_D: 2,
                    VCA02_COMMODITY_MASTER_D: COMMODITY_IDS.OFF_FARM_FISHERIES,
                },
                { VCA08_STATUS_D: DELETE_STATUS.INACTIVE },
                {
                    VCA08_APPLICATION_STATUS_D: VCA_REPORT_STATUS.APPROVED,
                    VCA08_STATUS_D: DELETE_STATUS.ACTIVE,
                },
                {
                    VCA08_APPLICATION_STATUS_D: VCA_REPORT_STATUS.DRAFT,
                    VCA08_STATUS_D: DELETE_STATUS.ACTIVE,
                },
                {
                    VCA08_APPLICATION_STATUS_D: VCA_REPORT_STATUS.DRAFT,
                    VCA08_STATUS_D: DELETE_STATUS.ACTIVE,
                    VCA01_ACTIVITY_MASTER_D: 2,
                    VCA02_COMMODITY_MASTER_D: 999,
                },
                {
                    VCA08_APPLICATION_STATUS_D: VCA_REPORT_STATUS.IN_PROGRESS,
                    VCA08_STATUS_D: DELETE_STATUS.ACTIVE,
                    VCA02_COMMODITY_MASTER_D: COMMODITY_IDS.OFF_FARM_FISHERIES,
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("VCA08_REPORT", null, {});
    },
};

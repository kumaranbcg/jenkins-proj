"use strict";
const { COMMODITY_IDS } = require("../constants");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "VCA02_COMMODITY_MASTER",
            [
                {
                    VCA02_COMMODITY_MASTER_D: 1,
                    VCA01_ACTIVITY_MASTER_D: 1,
                    VCA02_COMMODITY_NAME_N: "Cumbu",
                },
                {
                    VCA02_COMMODITY_MASTER_D: COMMODITY_IDS.OFF_FARM_DAIRY,
                    VCA01_ACTIVITY_MASTER_D: 2,
                    VCA02_COMMODITY_NAME_N: "Dairy",
                    VCA02_IS_REPORT_D: 1,
                },
                {
                    VCA02_COMMODITY_MASTER_D: COMMODITY_IDS.OFF_FARM_FISHERIES,
                    VCA01_ACTIVITY_MASTER_D: 2,
                    VCA02_COMMODITY_NAME_N: "Fisheries",
                    VCA02_IS_REPORT_D: 1,
                },
                {
                    VCA02_COMMODITY_MASTER_D: 50,
                    VCA01_ACTIVITY_MASTER_D: 2,
                    VCA02_COMMODITY_NAME_N: "Milk",
                    VCA02_IS_REPORT_D: 1,
                },
                {
                    VCA02_COMMODITY_MASTER_D: 999,
                    VCA01_ACTIVITY_MASTER_D: 2,
                    VCA02_COMMODITY_NAME_N: "Dairy",
                    VCA02_IS_REPORT_D: 0,
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("VCA02_COMMODITY_MASTER", null, {});
    },
};

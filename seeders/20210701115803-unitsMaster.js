"use strict";

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "VCA05_UNITS_MASTER",
            [
                { VCA05_UNITS_MASTER_D: 1, VCA05_UNITS_NAME_N: "Kg", VCA05_REPORT_TYPE_N: "farm" },
                {
                    VCA05_UNITS_MASTER_D: 2,
                    VCA05_UNITS_NAME_N: "Ml",
                    VCA05_REPORT_TYPE_N: "nonFarmDairy",
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("VCA05_UNITS_MASTER", null, {});
    },
};

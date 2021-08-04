"use strict";

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "VCA03_COUNTRY_MASTER",
            [
                { VCA03_COUNTRY_MASTER_D: 1, VCA03_COUNTRY_NAME_N: "China" },
                { VCA03_COUNTRY_MASTER_D: 2, VCA03_COUNTRY_NAME_N: "India" },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("VCA03_COUNTRY_MASTER", null, {});
    },
};

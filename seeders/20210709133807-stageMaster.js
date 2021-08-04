"use strict";

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "VCA06_STAGE_MASTER",
            [
                { VCA06_STAGE_MASTER_D: 1, VCA06_STAGE_NAME_N: "Pre Production" },
                { VCA06_STAGE_MASTER_D: 2, VCA06_STAGE_NAME_N: "Post Production" },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("VCA06_STAGE_MASTER", null, {});
    },
};

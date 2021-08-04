"use strict";

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "VCA04_STATE_MASTER",
            [
                { VCA04_STATE_MASTER_D: 1, VCA04_STATE_NAME_N: "Tamil Nadu" },
                { VCA04_STATE_MASTER_D: 2, VCA04_STATE_NAME_N: "Kerala" },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("VCA04_STATE_MASTER", null, {});
    },
};

"use strict";

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "VCA01_ACTIVITY_MASTER",
            [
                { VCA01_ACTIVITY_MASTER_D: 1, VCA01_ACTIVITY_NAME_N: "Farm" },
                { VCA01_ACTIVITY_MASTER_D: 2, VCA01_ACTIVITY_NAME_N: "Non Farm" },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("VCA01_ACTIVITY_MASTER", null, {});
    },
};

"use strict";

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "VCA07_CHANNEL_MASTER",
            [
                { VCA07_CHANNEL_MASTER_D: 1, VCA07_CHANNEL_D: 1 },
                { VCA07_CHANNEL_MASTER_D: 2, VCA07_CHANNEL_D: 2 },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("VCA07_CHANNEL_MASTER", null, {});
    },
};

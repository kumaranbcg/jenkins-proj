"use strict";
const viewName = "TNRTP08_BLOCK_MASTER";
const query = "SELECT * FROM `TNRTP`.`TNRTP08_BLOCK_MASTER`";
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${viewName} AS ${query}`);
    },
    down: async (queryInterface) => {
        await queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    },
};

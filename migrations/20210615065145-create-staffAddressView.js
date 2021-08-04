"use strict";
const viewName = "TNRTP12_STAFF_ADDRESS";
const config = require("../config/config")[process.env.NODE_ENV];
let query = "SELECT * FROM `TNRTP`.`TNRTP12_STAFF_ADDRESS`";
const regex = new RegExp("`VCA`", "g");
query = query.replace(regex, `\`${config.database}\``);
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${viewName} AS ${query}`);
    },
    down: async (queryInterface) => {
        await queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    },
};

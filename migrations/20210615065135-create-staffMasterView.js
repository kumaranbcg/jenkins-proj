"use strict";
const viewName = "TNRTP06_STAFF_MASTER";
const config = require("../config/config")[process.env.NODE_ENV];
let query = "SELECT * FROM `TNRTP`.`TNRTP06_STAFF_MASTER`";
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

"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};
let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialectOptions: { multipleStatements: true },
    logging: false,
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.dialect.supports.schemas = true;
sequelize.authenticate();
console.log(`Database Connection has been established successfully to ${config.database}.`);
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach((file) => {
        db[file.split(".")[0]] = require("./" + file)(sequelize, Sequelize);
    });
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
module.exports = db;

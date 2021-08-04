require("dotenv").config();
const app = require("../app");
const dbConnection = require("../models");
const vcaFarmReportTestSuite = require("./testSuites/vcaFarmReportTestSuite");
const vcaOffFarmFisheriesReportTestSuite = require("./testSuites/vcaOffFarmFisheriesTestSuite");
const vcaReportTestSuite = require("./testSuites/vcaReportTestSuite");
const mastersTestSuite = require("./testSuites/mastersTestSuite");
const authorization = `Bearer ${process.env.API_AUTH_KEY}`;

describe("VCA Farm Routes", () => {
    vcaFarmReportTestSuite(authorization);
});
describe("VCA Routes", () => {
    vcaReportTestSuite(authorization);
});
describe("VCA Off Farm Fisheries Routes", () => {
    vcaOffFarmFisheriesReportTestSuite(authorization);
});
describe("Master Routes", () => {
    mastersTestSuite(authorization);
});
afterAll(async (done) => {
    app.close();
    dbConnection.sequelize.close();
    done();
});

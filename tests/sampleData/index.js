const { vcaFarmReportData, commentsData } = require("../sampleData/vcaFarmReport");
const { vcaOffFarmFisheriesReportData } = require("../sampleData/vcaOffFarmFisheriesReport");
const draftData = { reportId: 1 };
const alreadyDeletedData = { reportId: 2 };
const alreadyApprovedData = { reportId: 3 };
const hardData = { reportId: 4 };
const unknownCommodityData = { reportId: 5 };
const unknownReportData = { reportId: 100 };

module.exports.draftData = draftData;
module.exports.alreadyApprovedData = alreadyApprovedData;
module.exports.alreadyDeletedData = alreadyDeletedData;
module.exports.unknownReportData = unknownReportData;
module.exports.hardData = hardData;
module.exports.unknownCommodityData = unknownCommodityData;
module.exports.vcaFarmReportData = vcaFarmReportData;
module.exports.vcaOffFarmFisheriesReportData = vcaOffFarmFisheriesReportData;
module.exports.commentsData = commentsData;


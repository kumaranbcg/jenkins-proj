const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaGroupDetails = sequelize.define(
        "VCA13_GROUP_DETAILS",
        {
            VCA13_GROUP_DETAILS_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            noOfPg: { type: DataTypes.INTEGER, field: "VCA13_NO_OF_PG_D" },
            producersInPg: { type: DataTypes.INTEGER, field: "VCA13_PRODUCERS_IN_PG_D" },
            noOfEg: { type: DataTypes.INTEGER, field: "VCA13_NO_OF_EG_D" },
            membersInEg: { type: DataTypes.INTEGER, field: "VCA13_MEMBERS_IN_EG_D" },
            noOfPc: { type: DataTypes.INTEGER, field: "VCA13_NO_OF_PC_D" },
            producersInPc: { type: DataTypes.INTEGER, field: "VCA13_PRODUCERS_IN_PC_D" },
            pcRoles: { type: DataTypes.STRING, field: "VCA13_PC_ROLES_N" },
            pgToBeFormed: { type: DataTypes.INTEGER, field: "VCA13_PG_TO_BE_FORMED_D" },
            egToBeFormed: { type: DataTypes.INTEGER, field: "VCA13_EG_TO_BE_FORMED_D" },
            pcToBeFormed: { type: DataTypes.INTEGER, field: "VCA13_PC_TO_BE_FORMED_D" },
            isFilled: { type: DataTypes.BOOLEAN, field: "VCA13_IS_FILLED_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA13_STATUS_D" },
            VCA13_CREATED_AT: { type: DataTypes.DATE },
            VCA13_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaGroupDetails.commonFields = [
        "noOfPg",
        "producersInPg",
        "noOfEg",
        "membersInEg",
        "noOfPc",
        "producersInPc",
        "pcRoles",
        "pgToBeFormed",
        "egToBeFormed",
        "pcToBeFormed",
    ];
    return vcaGroupDetails;
};

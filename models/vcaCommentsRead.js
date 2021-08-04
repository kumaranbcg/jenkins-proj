const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaCommentsRead = sequelize.define(
        "VCA25_COMMENTS_READ",
        {
            VCA25_COMMENTS_READ_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            role: { type: DataTypes.INTEGER, field: "TNRTP18_ROLE_MASTER_D" },
            lastReadAt: { type: DataTypes.DATE, field: "VCA25_LAST_READ_AT" },
            status: { type: DataTypes.BOOLEAN, field: "VCA25_STATUS_D" },
            VCA25_CREATED_AT: { type: DataTypes.DATE },
            VCA25_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaCommentsRead.selectedFields = ["reportId", "role", "lastReadAt"];
    return vcaCommentsRead;
};

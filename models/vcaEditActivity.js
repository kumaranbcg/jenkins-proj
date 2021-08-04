const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaEditActivity = sequelize.define(
        "VCA26_EDIT_ACTIVITY",
        {
            VCA26_EDIT_ACTIVITY_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            section: { type: DataTypes.STRING, field: "VCA26_SECTION_N" },
            status: { type: DataTypes.BOOLEAN, field: "VCA26_STATUS_D" },
            VCA26_CREATED_AT: { type: DataTypes.DATE },
            VCA26_UPDATED_AT: { type: DataTypes.DATE },
            VCA26_CREATED_D: { type: DataTypes.INTEGER },
            VCA26_UPDATED_D: { type: DataTypes.INTEGER },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaEditActivity.selectedFields = ["section"];
    return vcaEditActivity;
};

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const unitsMaster = sequelize.define(
        "VCA05_UNITS_MASTER",
        {
            value: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "VCA05_UNITS_MASTER_D",
            },
            label: { type: DataTypes.STRING, field: "VCA05_UNITS_NAME_N" },
            description: { type: DataTypes.STRING, field: "VCA05_UNITS_DESCRIPTION_N" },
            reportType: {
                type: DataTypes.TEXT,
                field: "VCA05_REPORT_TYPE_N",
                get(reportType) {
                    const reportTypes = this.getDataValue(reportType);
                    return reportTypes ? reportTypes.split(",") : [];
                },
            },
            status: { type: DataTypes.BOOLEAN, field: "VCA05_STATUS_D" },
            VCA05_CREATED_AT: { type: DataTypes.DATE },
            VCA05_UPDATED_AT: { type: DataTypes.DATE },
        },
        {
            freezeTableName: true,
            timestamps: false,
            schema: config.database,
        }
    );
    unitsMaster.selectedFields = ["value", "label", "description", "reportType"];
    return unitsMaster;
};

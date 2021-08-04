const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const permissionsView = sequelize.define(
        "TNRTP01_PERMISSIONS",
        {
            sno: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            moduleId: { type: DataTypes.INTEGER },
            moduleName: { type: DataTypes.STRING },
            moduleIcon: { type: DataTypes.STRING },
            groupId: { type: DataTypes.INTEGER },
            groupName: { type: DataTypes.STRING },
            roleId: { type: DataTypes.INTEGER },
            roleName: { type: DataTypes.STRING },
            actionId: { type: DataTypes.INTEGER },
            actionName: { type: DataTypes.STRING },
            actionKey: { type: DataTypes.STRING },
            actionCategory: { type: DataTypes.INTEGER },
            isPermission: { type: DataTypes.BOOLEAN },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    permissionsView.selectedFields = [
        "moduleId",
        "moduleName",
        "moduleIcon",
        "groupId",
        "groupName",
        "roleId",
        "roleName",
        "actionId",
        "actionName",
        "actionKey",
        "actionCategory",
        "isPermission",
    ];
    return permissionsView;
};

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const staffMasterView = sequelize.define(
        "TNRTP06_STAFF_MASTER",
        {
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: "TNRTP06_STAFF_MASTER_D",
            },
            userName: { type: DataTypes.STRING, field: "TNRTP06_USER_NAME_N" },
            status: { type: DataTypes.BOOLEAN, field: "TNRTP06_STATUS_D" },
            groupId: { type: DataTypes.INTEGER, field: "TNRTP06_GROUP_D" },
            roleId: { type: DataTypes.INTEGER, field: "TNRTP06_NEW_ROLE_D" },
            role: { type: DataTypes.INTEGER, field: "TNRTP06_ROLE_D" },
            isGro: { type: DataTypes.BOOLEAN, field: "TNRTP06_IS_GRO_D" },
            createdBy: { type: DataTypes.INTEGER, field: "TNRTP06_CREATED_D" },
            emailId: { type: DataTypes.STRING, field: "TNRTP06_EMAIL_N" },
            mobileNumber: { type: DataTypes.STRING, field: "TNRTP06_MOBILE_NUMBER_R" },
            password: { type: DataTypes.STRING, field: "TNRTP06_PASSWORD_N" },
            isNewUser: { type: DataTypes.BOOLEAN, field: "TNRTP06_IS_NEW_USER_D" },
            loggedIn: { type: DataTypes.STRING, field: "TNRTP06_LOGGED_IN_AT" },
            isAccountLocked: { type: DataTypes.BOOLEAN, field: "TNRTP06_IS_ACCOUNT_LOCKED_D" },
            lastAttemptAt: { type: DataTypes.STRING, field: "TNRTP06_LAST_ATTEMPT_AT" },
            noOfAttempts: { type: DataTypes.INTEGER, field: "TNRTP06_NO_OF_ATTEMPTS" },
            isDeleted: { type: DataTypes.BOOLEAN, field: "TNRTP06_IS_DELETED_D" },
            createdAt: { type: DataTypes.DATE, field: "TNRTP06_CREATED_AT" },
            TNRTP06_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    staffMasterView.associate = function (models) {
        staffMasterView.hasOne(models.staffAddressView, {
            foreignKey: "TNRTP12_STAFF_MASTER_D",
            as: "staffAddressView",
        });
    };
    staffMasterView.selectedFields = [
        "userId",
        "userName",
        "status",
        "groupId",
        "roleId",
        "role",
        "isGro",
        "emailId",
        "mobileNumber",
        "password",
        "isNewUser",
        "loggedIn",
        "isAccountLocked",
        "lastAttemptAt",
        "noOfAttempts",
        "createdAt",
    ];
    return staffMasterView;
};

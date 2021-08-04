const models = require("../models");
const getPermission = async (user) => {
    const { roleId } = user;
    const permission = await models.permissionView.findAll({
        where: { moduleKey: "vca", roleId },
        attributes: ["actionKey", "isPermission", "moduleId", "roleName", "groupName"],
        raw: true,
    });
    return permission;
};

module.exports = getPermission;

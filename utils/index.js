const errorCodes = require("../config/errorCodes");
const errorMessages = require("../config/errorMsgs");
const response = require("./response");
const permissionFunc = require("./getPermission");
module.exports = {
    verifyToken: require("./verifyToken"),
    hasRole: (action) => {
        return async (req, res, next) => {
            const permission = await permissionFunc(req.user);
            const permissionWithAction = permission.find((x) => x.actionKey == action);
            if (
                !permission.length ||
                (permissionWithAction && !permissionWithAction.isPermission)
            ) {
                return response.invalid(
                    req,
                    res,
                    errorCodes.HTTP_UNAUTHORIZED,
                    errorMessages.actionNotPermitted
                );
            }
            req.user.permission = permission;
            req.user.moduleId = permission[0].moduleId;
            req.user.roleName = permission[0].roleName;
            req.user.groupName = permission[0].groupName;
            next();
        };
    },
    docUpload: require("./docUpload"),
    response: require("./response"),
    encryptDecrypt: require("./encryptDecrypt"),
    cryptoAlgo: require("./cryptojs"),
    swagger: require("./swagger"),
};

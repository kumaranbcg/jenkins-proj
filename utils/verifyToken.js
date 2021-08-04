const jwt = require("jsonwebtoken");
const errorCodes = require("../config/errorCodes");
const errorMessages = require("../config/errorMsgs");
const response = require("./response");
const models = require("../models");
const { STAFF_STATUS, IS_DELETED } = require("../constants");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.AES_KEY);
const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["token"];
    if (token) {
        token = token.replace("Bearer ", "");
        return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if (err) {
                response.invalid(
                    req,
                    res,
                    errorCodes.HTTP_UNAUTHORIZED,
                    errorMessages[errorCodes.HTTP_UNAUTHORIZED]
                );
            } else {
                let { userId, groupId, roleId, loggedIn } = payload;
                if (!userId || !groupId || !roleId || !loggedIn) {
                    return response.invalid(
                        req,
                        res,
                        errorCodes.HTTP_UNAUTHORIZED,
                        errorMessages[errorCodes.HTTP_UNAUTHORIZED]
                    );
                }
                userId = cryptr.decrypt(userId);
                groupId = cryptr.decrypt(groupId);
                roleId = cryptr.decrypt(roleId);
                loggedIn = cryptr.decrypt(loggedIn);
                let userData = await models.staffMasterView.findOne({
                    where: {
                        userId,
                        groupId,
                        roleId,
                        loggedIn,
                        status: STAFF_STATUS.ACTIVE,
                        isDeleted: IS_DELETED.NOT_DELETED,
                    },
                    attributes: [
                        ...models.staffMasterView.selectedFields,
                        [
                            models.sequelize.col("staffAddressView.TNRTP12_DISTRICT_MASTER_D"),
                            "districtId",
                        ],
                        [
                            models.sequelize.col("staffAddressView.TNRTP12_BLOCK_MASTER_D"),
                            "blockId",
                        ],
                        [
                            models.sequelize.col("staffAddressView.TNRTP12_PANCHAYAT_MASTER_D"),
                            "panchayatId",
                        ],
                    ],
                    include: {
                        model: models.staffAddressView,
                        as: "staffAddressView",
                        attributes: [],
                        required: false,
                    },
                    raw: true,
                });
                if (!userData) {
                    return response.invalid(
                        req,
                        res,
                        errorCodes.HTTP_UNAUTHORIZED,
                        errorMessages[errorCodes.HTTP_UNAUTHORIZED]
                    );
                }
                req.user = {};
                req.user = userData;
                req.user.token = token;
                next();
            }
        });
    } else {
        response.invalid(
            req,
            res,
            errorCodes.HTTP_UNAUTHORIZED,
            errorMessages[errorCodes.HTTP_UNAUTHORIZED]
        );
    }
};

module.exports = verifyToken;

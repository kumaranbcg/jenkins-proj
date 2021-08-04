const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaComments = sequelize.define(
        "VCA23_COMMENTS",
        {
            commentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "VCA23_COMMENTS_D",
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            comment: { type: DataTypes.TEXT, field: "VCA23_COMMENT_N" },
            role: { type: DataTypes.INTEGER, field: "VCA23_ROLE_D" },
            replyCommentId: { type: DataTypes.INTEGER, field: "VCA23_REPLY_COMMENT_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA23_STATUS_D" },
            createdAt: { type: DataTypes.DATE, field: "VCA23_CREATED_AT" },
            VCA23_UPDATED_AT: { type: DataTypes.DATE },
            VCA23_CREATED_D: { type: DataTypes.INTEGER },
            VCA23_UPDATED_D: { type: DataTypes.INTEGER },
        },
        {
            freezeTableName: true,
            timestamps: false,
            schema: config.database,
        }
    );
    vcaComments.associate = function (models) {
        vcaComments.hasMany(models.vcaCommentDocument, {
            foreignKey: "VCA23_COMMENTS_D",
            as: "vcaCommentDocument",
        });
        vcaComments.belongsTo(models.staffMasterView, {
            foreignKey: "VCA23_CREATED_D",
            as: "staffMasterView",
        });
    };
    vcaComments.selectedFields = ["commentId", "comment", "role", "replyCommentId", "createdAt"];
    return vcaComments;
};

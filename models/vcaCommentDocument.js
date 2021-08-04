const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaCommentDocument = sequelize.define(
        "VCA24_COMMENT_DOCUMENT",
        {
            VCA24_COMMENT_DOCUMENT_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            commentId: { type: DataTypes.INTEGER, field: "VCA23_COMMENTS_D" },
            documentUrl: { type: DataTypes.TEXT, field: "VCA24_DOCUMENT_URL_N" },
            documentName: { type: DataTypes.STRING, field: "VCA24_DOCUMENT_NAME_N" },
            type: { type: DataTypes.INTEGER, field: "VCA24_TYPE_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA24_STATUS_D" },
            VCA24_CREATED_AT: { type: DataTypes.DATE },
            VCA24_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaCommentDocument.selectedFields = ["documentUrl", "documentName"];
    return vcaCommentDocument;
};

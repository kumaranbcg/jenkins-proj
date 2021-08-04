const notificationUrl = "https://qa-api.tnrtp.org/tnrtp-notification-service/api/v1/notification";
const axios = require("axios");
const { MESSAGE_TYPE } = require("../constants");
const messageTemplate = (fromUser, data, msgType) => {
    return {
        [MESSAGE_TYPE.UPLOAD]: `<p style="font-size:0.75rem;color:#434343;line-height: 1.3rem;margin-bottom: 0;">
                                    <strong style="font-size:0.875rem;">${data.documentTitle}</strong>&nbsp;
                                    Ver ${data.version} Created Successfully
                                </p>`,
        [MESSAGE_TYPE.EDIT]: `<p style="font-size:0.75rem;color:#434343;line-height: 1.3rem;margin-bottom: 0;">
                                <strong style="font-size:0.875rem;">${fromUser.userName}</strong>&nbsp;
                                Edited in ${data.documentTitle}.
                            </p>`,
        [MESSAGE_TYPE.REVIEW]: `<p style="font-size:0.75rem;color:#434343;line-height: 1.3rem;margin-bottom: 0;">
                                    <strong style="font-size:0.875rem;">${data.documentTitle}</strong>&nbsp;
                                    Review & Recommend Successfully
                                </p>`,
        [MESSAGE_TYPE.APPROVE]: `<p style="font-size:0.75rem;color:#434343;line-height: 1.3rem;margin-bottom: 0;">
                                    <strong style="font-size:0.875rem;">${data.documentTitle}</strong>&nbsp;
                                    Approved Successfully
                                </p>`,
        [MESSAGE_TYPE.COMMENT]: `<p style="font-size:0.75rem;color:#434343;line-height: 1.3rem;margin-bottom: 0;">
                                    <strong style="font-size:0.875rem;">${fromUser.userName}</strong>&nbsp;
                                    Commented on ${data.documentTitle}
                                </p>`,
        [MESSAGE_TYPE.REPLY_COMMENT]: `<p style="font-size:0.75rem;color:#434343;line-height: 1.3rem;margin-bottom: 0;">
                                            <strong style="font-size:0.875rem;">${fromUser.userName}</strong>&nbsp;
                                            Replied to your comment on ${data.documentTitle}
                                        </p>`,
    }[msgType];
};
const sendNotification = async (notifyUsers) => {
    if (!notifyUsers.length) return true;
    const reqBody = notifyUsers.reduce((res, { toUser, fromUser, data, msgType }) => {
        let msgHtml = messageTemplate(fromUser, data, msgType);
        let msg = msgHtml
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/&nbsp;/g, "")
            .replace(/\n/g, "")
            .split(" ")
            .filter((x) => x != "")
            .join(" ");
        let obj = {
            userId: toUser.userId,
            moduleId: fromUser.moduleId,
            objectId: data.reportId,
            msg,
            msgHtml,
            status: msgType,
            from: fromUser.userName,
            to: toUser.userName,
        };
        return [...res, obj];
    }, []);

    await axios({
        method: "POST",
        url: notificationUrl,
        headers: { token: notifyUsers[0].fromUser.token, "Content-Type": "application/json" },
        data: reqBody,
    }).catch(() => true);
};
module.exports = { sendNotification };

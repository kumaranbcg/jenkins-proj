const uploadToS3 = require("./uploadToS3");
const PdfPrinter = require("pdfmake");
const printer = new PdfPrinter({
    Roboto: {
        normal: "fonts/Roboto-Regular.ttf",
        bold: "fonts/Roboto-Medium.ttf",
        italics: "fonts/Roboto-Italic.ttf",
        bolditalics: "fonts/Roboto-MediumItalic.ttf",
    },
});
const makePdf = async (data, callback) => {
    const docDefinition = {
        content: [],
        styles: {
            lineSpace: {
                margin: [0, 3],
            },
            marginTop: {
                margin: [0, 8, 0, 0],
            },
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 12, 0, 12],
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5],
            },
            tableExample: {
                margin: [0, 5, 0, 15],
                borderColor: "white",
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: "black",
            },
            bold: {
                bold: true,
            },
        },
        defaultStyle: {
            columnGap: 0,
            margin: [0, 0, 0, 0],
        },
        footer: function (currentPage, pageCount) {
            return {
                text: "Page " + currentPage.toString() + " of " + pageCount,
                alignment: "center",
                style: "normalText",
                margin: [0, 20, 60, 0],
            };
        },
        pageSize:
            data.ddsPrioComm.commodities.inBlocks.length > 15
                ? "A1"
                : data.ddsPrioComm.commodities.inBlocks.length > 10
                ? "A2"
                : "A3",
    };
    const filename = data.ddsDocUpload.documentTitle + ".pdf";
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    // const fs = require("fs");
    // pdfDoc.pipe(fs.createWriteStream("./public/document.pdf"));
    let buffers = [];
    pdfDoc.on("data", buffers.push.bind(buffers));
    pdfDoc.on("end", async () => {
        const pdfData = await uploadToS3({
            buffer: Buffer.concat(buffers),
            contentType: "application/pdf",
            fileName: filename,
        });
        callback(pdfData);
    });
    pdfDoc.end();
};
module.exports = makePdf;

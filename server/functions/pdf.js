const pdf = require("pdf-parse");
const bodyParser = require("body-parser");
const { PDFDocument, rgb } = require("pdf-lib");

const readPdfFileContent = async (file) => {
    try {
        const buffer = file.buffer;
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error("Error reading PDF file:", error);
        throw error;
    }
}

const createPdfFromText = async (cvText) => {
    const pdfDoc = await PDFDocument.create();
    const pageWidth = 600;
    const pageHeight = 800;
    const font = await pdfDoc.embedFont("Helvetica");

    const pages = [];
    const contentLines = cvText.split("\n");

    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    let currentY = pageHeight - 50;
    let currentPageIndex = 0;

    for (const line of contentLines) {
        if (currentY - 12 < 50) {
            currentPageIndex++;
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            currentY = pageHeight - 50;
        }

        currentPage.drawText(line, {
            x: 50,
            y: currentY,
            size: 12,
            font,
            color: rgb(0, 0, 0),
        });

        currentY -= 12;
        pages[currentPageIndex] = pages[currentPageIndex] || [];
        pages[currentPageIndex].push(line);
    }
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

module.exports = {
    readPdfFileContent,
    createPdfFromText,
};
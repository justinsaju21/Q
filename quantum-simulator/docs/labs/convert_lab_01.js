const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageNumber, LevelFormat, TabStopType, TabStopPosition } = require('docx');

// Read the markdown file
const mdContent = fs.readFileSync('LAB_01_DETERMINISTIC_BIT.md', 'utf8');
const lines = mdContent.split('\n');

// Helper function to parse inline formatting
function parseInlineFormatting(text) {
    const runs = [];
    let currentText = '';
    let i = 0;

    while (i < text.length) {
        // Handle inline math $...$
        if (text[i] === '$' && text[i+1] !== '$') {
            if (currentText) {
                runs.push(new TextRun(currentText));
                currentText = '';
            }
            i++;
            let mathText = '';
            while (i < text.length && text[i] !== '$') {
                mathText += text[i];
                i++;
            }
            i++; // Skip closing $
            runs.push(new TextRun({ text: mathText, italics: true, font: "Cambria Math" }));
        }
        // Handle bold **text**
        else if (text[i] === '*' && text[i+1] === '*') {
            if (currentText) {
                runs.push(new TextRun(currentText));
                currentText = '';
            }
            i += 2;
            let boldText = '';
            while (i < text.length && !(text[i] === '*' && text[i+1] === '*')) {
                boldText += text[i];
                i++;
            }
            i += 2; // Skip closing **
            runs.push(new TextRun({ text: boldText, bold: true }));
        }
        // Handle italic *text*
        else if (text[i] === '*' && text[i+1] !== '*') {
            if (currentText) {
                runs.push(new TextRun(currentText));
                currentText = '';
            }
            i++;
            let italicText = '';
            while (i < text.length && text[i] !== '*') {
                italicText += text[i];
                i++;
            }
            i++; // Skip closing *
            runs.push(new TextRun({ text: italicText, italics: true }));
        }
        else {
            currentText += text[i];
            i++;
        }
    }

    if (currentText) {
        runs.push(new TextRun(currentText));
    }

    return runs.length > 0 ? runs : [new TextRun('')];
}

// Helper function to parse table
function parseTable(tableLines) {
    const rows = [];
    let isFirstRow = true;
    let columnCount = 0;

    for (const line of tableLines) {
        if (line.includes(':---') || line.includes('---')) {
            continue; // Skip separator line
        }

        const cells = line.split('|').map(c => c.trim()).filter(c => c);
        if (cells.length === 0) continue;

        if (columnCount === 0) columnCount = cells.length;

        const tableCells = cells.map(cellText => {
            const border = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
            const borders = { top: border, bottom: border, left: border, right: border };

            return new TableCell({
                borders,
                shading: {
                    fill: isFirstRow ? "D5E8F0" : "FFFFFF",
                    type: ShadingType.CLEAR
                },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                width: { size: Math.floor(9360 / columnCount), type: WidthType.DXA },
                children: [new Paragraph({
                    children: parseInlineFormatting(cellText),
                    alignment: AlignmentType.LEFT
                })]
            });
        });

        rows.push(new TableRow({ children: tableCells }));
        isFirstRow = false;
    }

    return new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: Array(columnCount).fill(Math.floor(9360 / columnCount)),
        rows
    });
}

// Parse content
const docElements = [];
let i = 0;
let inTable = false;
let tableLines = [];
let displayMathLines = [];
let inDisplayMath = false;

while (i < lines.length) {
    const line = lines[i];

    // Handle display math $$...$$
    if (line.trim() === '$$') {
        if (!inDisplayMath) {
            inDisplayMath = true;
            displayMathLines = [];
        } else {
            // End of display math
            inDisplayMath = false;
            const mathText = displayMathLines.join('\n');
            docElements.push(new Paragraph({
                children: [new TextRun({ text: mathText, italics: true, font: "Cambria Math" })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 120, after: 120 }
            }));
            displayMathLines = [];
        }
        i++;
        continue;
    }

    if (inDisplayMath) {
        displayMathLines.push(line);
        i++;
        continue;
    }

    // Handle tables
    if (line.includes('|') && line.trim().startsWith('|')) {
        if (!inTable) {
            inTable = true;
            tableLines = [];
        }
        tableLines.push(line);
        i++;

        // Check if next line is not a table
        if (i >= lines.length || !lines[i].includes('|')) {
            inTable = false;
            docElements.push(parseTable(tableLines));
            docElements.push(new Paragraph({ text: '' })); // Add spacing after table
        }
        continue;
    }

    // Handle horizontal rules
    if (line.trim() === '---') {
        docElements.push(new Paragraph({
            children: [new TextRun('')],
            border: {
                bottom: {
                    style: BorderStyle.SINGLE,
                    size: 6,
                    color: "CCCCCC"
                }
            },
            spacing: { before: 120, after: 120 }
        }));
        i++;
        continue;
    }

    // Handle headings
    if (line.startsWith('# ')) {
        docElements.push(new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: parseInlineFormatting(line.substring(2)),
            spacing: { before: 240, after: 120 }
        }));
    } else if (line.startsWith('## ')) {
        docElements.push(new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: parseInlineFormatting(line.substring(3)),
            spacing: { before: 200, after: 100 }
        }));
    } else if (line.startsWith('### ')) {
        docElements.push(new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: parseInlineFormatting(line.substring(4)),
            spacing: { before: 160, after: 80 }
        }));
    }
    // Handle numbered lists
    else if (/^\d+\.\s+/.test(line)) {
        const text = line.replace(/^\d+\.\s+/, '');
        docElements.push(new Paragraph({
            numbering: { reference: "numbers", level: 0 },
            children: parseInlineFormatting(text)
        }));
    }
    // Handle bullet lists with *
    else if (line.trim().startsWith('*   ') || line.trim().startsWith('* ')) {
        const text = line.replace(/^\s*\*\s+/, '');
        docElements.push(new Paragraph({
            numbering: { reference: "bullets", level: 0 },
            children: parseInlineFormatting(text)
        }));
    }
    // Handle bullet lists with -
    else if (line.trim().startsWith('-   ') || line.trim().startsWith('- ')) {
        const text = line.replace(/^\s*-\s+/, '');
        docElements.push(new Paragraph({
            numbering: { reference: "bullets", level: 0 },
            children: parseInlineFormatting(text)
        }));
    }
    // Handle empty lines
    else if (line.trim() === '') {
        // Add minimal spacing
        if (docElements.length > 0) {
            // Don't add extra empty paragraphs, let spacing handle it
        }
    }
    // Handle regular paragraphs
    else if (line.trim().length > 0) {
        docElements.push(new Paragraph({
            children: parseInlineFormatting(line),
            spacing: { before: 60, after: 60 }
        }));
    }

    i++;
}

// Create the document
const doc = new Document({
    styles: {
        default: {
            document: {
                run: { font: "Arial", size: 24 } // 12pt
            }
        },
        paragraphStyles: [
            {
                id: "Heading1",
                name: "Heading 1",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 32, bold: true, font: "Arial", color: "2E75B6" },
                paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
            },
            {
                id: "Heading2",
                name: "Heading 2",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 28, bold: true, font: "Arial", color: "2E75B6" },
                paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 }
            },
            {
                id: "Heading3",
                name: "Heading 3",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 26, bold: true, font: "Arial", color: "2E75B6" },
                paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 }
            }
        ]
    },
    numbering: {
        config: [
            {
                reference: "bullets",
                levels: [
                    {
                        level: 0,
                        format: LevelFormat.BULLET,
                        text: "•",
                        alignment: AlignmentType.LEFT,
                        style: {
                            paragraph: {
                                indent: { left: 720, hanging: 360 }
                            }
                        }
                    }
                ]
            },
            {
                reference: "numbers",
                levels: [
                    {
                        level: 0,
                        format: LevelFormat.DECIMAL,
                        text: "%1.",
                        alignment: AlignmentType.LEFT,
                        style: {
                            paragraph: {
                                indent: { left: 720, hanging: 360 }
                            }
                        }
                    }
                ]
            }
        ]
    },
    sections: [{
        properties: {
            page: {
                size: {
                    width: 12240,  // US Letter 8.5"
                    height: 15840  // US Letter 11"
                },
                margin: {
                    top: 1440,    // 1 inch
                    right: 1440,
                    bottom: 1440,
                    left: 1440
                }
            }
        },
        headers: {
            default: new Header({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({ text: "EXPERIMENT – 01: The Deterministic Bit", bold: true }),
                        ],
                        alignment: AlignmentType.CENTER,
                        border: {
                            bottom: {
                                style: BorderStyle.SINGLE,
                                size: 6,
                                color: "2E75B6"
                            }
                        },
                        spacing: { after: 120 }
                    })
                ]
            })
        },
        footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun("Page "),
                            new TextRun({
                                children: [PageNumber.CURRENT]
                            })
                        ],
                        alignment: AlignmentType.CENTER,
                        border: {
                            top: {
                                style: BorderStyle.SINGLE,
                                size: 6,
                                color: "2E75B6"
                            }
                        },
                        spacing: { before: 120 }
                    })
                ]
            })
        },
        children: docElements
    }]
});

// Generate the DOCX file
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('LAB_01_DETERMINISTIC_BIT.docx', buffer);
    console.log('LAB_01_DETERMINISTIC_BIT.docx created successfully!');
});

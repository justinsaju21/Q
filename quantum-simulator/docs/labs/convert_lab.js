const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageNumber, LevelFormat, TabStopType, TabStopPosition } = require('docx');

// Get lab file from command line argument
const labFile = process.argv[2] || 'LAB_01_DETERMINISTIC_BIT.md';
const labName = path.basename(labFile, '.md');
const outputFile = labName + '.docx';

console.log(`Converting ${labFile} to ${outputFile}...`);

// Read the markdown file
const mdContent = fs.readFileSync(labFile, 'utf8');
const lines = mdContent.split('\n');

// Helper function to convert LaTeX to readable text
function formatLatex(latex) {
    // Simple conversions for common quantum notation
    return latex
        .replace(/\\begin\{pmatrix\}/g, '[')
        .replace(/\\end\{pmatrix\}/g, ']')
        .replace(/\\\\/g, '; ')
        .replace(/\\rangle/g, '⟩')
        .replace(/\\langle/g, '⟨')
        .replace(/\\psi/g, 'ψ')
        .replace(/\\alpha/g, 'α')
        .replace(/\\beta/g, 'β')
        .replace(/\\pi/g, 'π')
        .replace(/\\dagger/g, '†')
        .replace(/\\times/g, '×')
        .replace(/\\cdot/g, '·')
        .replace(/\\rightarrow/g, '→')
        .replace(/\\Rightarrow/g, '⇒')
        .replace(/\\neq/g, '≠')
        .replace(/\\leq/g, '≤')
        .replace(/\\geq/g, '≥')
        .replace(/\\approx/g, '≈')
        .replace(/\\pm/g, '±')
        .replace(/\\sqrt/g, '√')
        .replace(/\\infty/g, '∞')
        .replace(/\\partial/g, '∂')
        .replace(/\\sum/g, '∑')
        .replace(/\\prod/g, '∏')
        .replace(/\\int/g, '∫');
}

// Helper function to parse inline formatting
function parseInlineFormatting(text) {
    const runs = [];
    let currentText = '';
    let i = 0;

    while (i < text.length) {
        // Handle inline math $...$
        if (text[i] === '$' && (i === 0 || text[i-1] !== '\\') && text[i+1] !== '$') {
            if (currentText) {
                runs.push(new TextRun(currentText));
                currentText = '';
            }
            i++;
            let mathText = '';
            while (i < text.length && (text[i] !== '$' || text[i-1] === '\\')) {
                mathText += text[i];
                i++;
            }
            i++; // Skip closing $
            const formattedMath = formatLatex(mathText);
            runs.push(new TextRun({
                text: formattedMath,
                italics: true,
                font: "Cambria Math",
                size: 22
            }));
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
            // Check if bold text contains inline math
            if (boldText.includes('$')) {
                const boldRuns = parseInlineFormatting(boldText);
                boldRuns.forEach(run => {
                    // Add bold to each run
                    runs.push(new TextRun({
                        text: run.text || '',
                        bold: true,
                        italics: run.italics,
                        font: run.font
                    }));
                });
            } else {
                runs.push(new TextRun({ text: boldText, bold: true }));
            }
        }
        // Handle italic *text* (but not list markers)
        else if (text[i] === '*'  && text[i+1] !== '*' && i > 0) {
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
        // Handle backticks for code
        else if (text[i] === '`') {
            if (currentText) {
                runs.push(new TextRun(currentText));
                currentText = '';
            }
            i++;
            let codeText = '';
            while (i < text.length && text[i] !== '`') {
                codeText += text[i];
                i++;
            }
            i++; // Skip closing `
            runs.push(new TextRun({
                text: codeText,
                font: "Courier New",
                size: 20,
                shading: { fill: "F0F0F0", type: ShadingType.CLEAR }
            }));
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
    let alignment = [];

    for (let idx = 0; idx < tableLines.length; idx++) {
        const line = tableLines[idx];

        // Parse alignment row
        if (line.includes(':---') || (line.includes('---') && line.includes('|'))) {
            const aligns = line.split('|').map(c => c.trim()).filter(c => c);
            alignment = aligns.map(a => {
                if (a.startsWith(':') && a.endsWith(':')) return AlignmentType.CENTER;
                if (a.endsWith(':')) return AlignmentType.RIGHT;
                return AlignmentType.LEFT;
            });
            continue;
        }

        const cells = line.split('|').map(c => c.trim()).filter(c => c);
        if (cells.length === 0) continue;

        if (columnCount === 0) columnCount = cells.length;

        const tableCells = cells.map((cellText, cellIdx) => {
            const border = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
            const borders = { top: border, bottom: border, left: border, right: border };
            const cellAlign = alignment[cellIdx] || AlignmentType.LEFT;

            return new TableCell({
                borders,
                shading: {
                    fill: isFirstRow ? "D3D3D3" : "FFFFFF",
                    type: ShadingType.CLEAR
                },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                width: { size: Math.floor(9360 / columnCount), type: WidthType.DXA },
                children: [new Paragraph({
                    children: parseInlineFormatting(cellText),
                    alignment: cellAlign
                })]
            });
        });

        rows.push(new TableRow({ children: tableCells }));
        isFirstRow = false;
    }

    const colWidths = Array(columnCount).fill(Math.floor(9360 / columnCount));

    return new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: colWidths,
        rows
    });
}

// Extract title from first heading
let docTitle = labName.replace(/_/g, ' ');
for (const line of lines) {
    if (line.startsWith('# ')) {
        docTitle = line.substring(2).trim();
        break;
    }
}

// Parse content
const docElements = [];
let i = 0;
let inTable = false;
let tableLines = [];
let displayMathText = '';
let inDisplayMath = false;
let inCodeBlock = false;
let codeBlockLines = [];

while (i < lines.length) {
    let line = lines[i];

    // Handle code blocks ```
    if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
            inCodeBlock = true;
            codeBlockLines = [];
        } else {
            // End of code block
            inCodeBlock = false;
            if (codeBlockLines.length > 0) {
                docElements.push(new Paragraph({
                    children: [new TextRun({
                        text: codeBlockLines.join('\n'),
                        font: "Courier New",
                        size: 20
                    })],
                    shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                    spacing: { before: 120, after: 120 }
                }));
            }
            codeBlockLines = [];
        }
        i++;
        continue;
    }

    if (inCodeBlock) {
        codeBlockLines.push(line);
        i++;
        continue;
    }

    // Handle display math $$...$$ (can be inline or multi-line)
    if (line.includes('$$')) {
        const parts = line.split('$$');
        if (parts.length === 3) {
            // Inline display math $$...$$
            const mathText = formatLatex(parts[1]);
            docElements.push(new Paragraph({
                children: [new TextRun({
                    text: mathText,
                    italics: true,
                    font: "Cambria Math",
                    size: 24
                })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 200 }
            }));
        } else if (line.trim() === '$$') {
            // Multi-line display math
            if (!inDisplayMath) {
                inDisplayMath = true;
                displayMathText = '';
            } else {
                // End of display math
                inDisplayMath = false;
                const formattedMath = formatLatex(displayMathText);
                docElements.push(new Paragraph({
                    children: [new TextRun({
                        text: formattedMath,
                        italics: true,
                        font: "Cambria Math",
                        size: 24
                    })],
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 200, after: 200 }
                }));
                displayMathText = '';
            }
        } else {
            // Handle cases like text$$math$$ or $$math$$text
            const mathParts = line.split('$$').filter(p => p.trim());
            const runs = [];
            line.split('$$').forEach((part, idx) => {
                if (idx % 2 === 1) {
                    // Math part
                    const formatted = formatLatex(part);
                    runs.push(new TextRun({
                        text: formatted,
                        italics: true,
                        font: "Cambria Math",
                        size: 24
                    }));
                } else if (part.trim()) {
                    // Regular text
                    runs.push(...parseInlineFormatting(part));
                }
            });
            if (runs.length > 0) {
                docElements.push(new Paragraph({
                    children: runs,
                    spacing: { before: 120, after: 120 }
                }));
            }
        }
        i++;
        continue;
    }

    if (inDisplayMath) {
        displayMathText += line + '\n';
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
        if (i >= lines.length || !lines[i].includes('|') || !lines[i].trim().startsWith('|')) {
            inTable = false;
            docElements.push(parseTable(tableLines));
            docElements.push(new Paragraph({
                children: [new TextRun('')],
                spacing: { before: 100, after: 100 }
            }));
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
                    size: 12,
                    color: "CCCCCC"
                }
            },
            spacing: { before: 200, after: 200 }
        }));
        i++;
        continue;
    }

    // Handle headings
    if (line.startsWith('# ')) {
        docElements.push(new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: parseInlineFormatting(line.substring(2)),
            spacing: { before: 300, after: 150 },
            pageBreakBefore: docElements.length > 0
        }));
    } else if (line.startsWith('## ')) {
        docElements.push(new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: parseInlineFormatting(line.substring(3)),
            spacing: { before: 240, after: 120 }
        }));
    } else if (line.startsWith('### ')) {
        docElements.push(new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: parseInlineFormatting(line.substring(4)),
            spacing: { before: 200, after: 100 }
        }));
    } else if (line.startsWith('#### ')) {
        docElements.push(new Paragraph({
            children: parseInlineFormatting(line.substring(5)),
            spacing: { before: 160, after: 80 },
            run: { bold: true, size: 24 }
        }));
    }
    // Handle numbered lists
    else if (/^\d+\.\s+/.test(line)) {
        const text = line.replace(/^\d+\.\s+/, '');
        docElements.push(new Paragraph({
            numbering: { reference: "numbers", level: 0 },
            children: parseInlineFormatting(text),
            spacing: { before: 50, after: 50 }
        }));
    }
    // Handle bullet lists with * or -
    else if (line.trim().startsWith('*   ') || line.trim().startsWith('* ')) {
        const text = line.replace(/^\s*\*\s+/, '');
        docElements.push(new Paragraph({
            numbering: { reference: "bullets", level: 0 },
            children: parseInlineFormatting(text),
            spacing: { before: 50, after: 50 }
        }));
    }
    else if (line.trim().startsWith('-   ') || line.trim().startsWith('- ')) {
        const text = line.replace(/^\s*-\s+/, '');
        docElements.push(new Paragraph({
            numbering: { reference: "bullets", level: 0 },
            children: parseInlineFormatting(text),
            spacing: { before: 50, after: 50 }
        }));
    }
    // Handle empty lines - add spacing only between content blocks
    else if (line.trim() === '') {
        // Skip excessive empty lines
        if (docElements.length > 0 &&
            !(docElements[docElements.length - 1].spacing &&
              docElements[docElements.length - 1].spacing.after >= 100)) {
            // Spacing is handled by paragraphs themselves
        }
    }
    // Handle regular paragraphs
    else if (line.trim().length > 0) {
        docElements.push(new Paragraph({
            children: parseInlineFormatting(line),
            spacing: { before: 80, after: 80 },
            alignment: AlignmentType.JUSTIFIED
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
                run: { size: 36, bold: true, font: "Arial", color: "1F4E78" },
                paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 0 }
            },
            {
                id: "Heading2",
                name: "Heading 2",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 30, bold: true, font: "Arial", color: "2E75B6" },
                paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 }
            },
            {
                id: "Heading3",
                name: "Heading 3",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 28, bold: true, font: "Arial", color: "5B9BD5" },
                paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 }
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
                            new TextRun({
                                text: docTitle,
                                bold: true,
                                size: 20
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                        border: {
                            bottom: {
                                style: BorderStyle.SINGLE,
                                size: 12,
                                color: "2E75B6"
                            }
                        },
                        spacing: { after: 100 }
                    })
                ]
            })
        },
        footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Page ",
                                size: 20
                            }),
                            new TextRun({
                                children: [PageNumber.CURRENT],
                                size: 20
                            })
                        ],
                        alignment: AlignmentType.CENTER,
                        border: {
                            top: {
                                style: BorderStyle.SINGLE,
                                size: 12,
                                color: "2E75B6"
                            }
                        },
                        spacing: { before: 100 }
                    })
                ]
            })
        },
        children: docElements
    }]
});

// Generate the DOCX file
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(outputFile, buffer);
    console.log(`✓ ${outputFile} created successfully!`);
}).catch(err => {
    console.error(`Error creating ${outputFile}:`, err);
    process.exit(1);
});

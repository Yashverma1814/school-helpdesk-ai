// Utility script to convert the synthetic text documents into PDF files.
const fs = require('fs');
const path = require('path');

let PDFDocument;
try {
  PDFDocument = require('pdfkit');
} catch {
  console.log('Notice: pdfkit is not installed. To compile .txt to .pdf, run: npm install -D pdfkit');
  console.log('The text files in data/synthetic-docs/ are already fully prepared and ready for conversion or direct testing.');
  process.exit(0);
}

const baseDir = path.join(__dirname, '..', 'data', 'synthetic-docs');
const schools = ['greenfield-public-school', 'oakridge-academy'];

schools.forEach((school) => {
  const schoolPath = path.join(baseDir, school);
  if (!fs.existsSync(schoolPath)) return;

  const files = fs.readdirSync(schoolPath).filter((f) => f.endsWith('.txt'));
  files.forEach((file) => {
    const filePath = path.join(schoolPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const pdfPath = path.join(schoolPath, file.replace('.txt', '.pdf'));

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(12).font('Helvetica').text(content, { lineGap: 4 });
    doc.end();
    console.log(`Generated: ${pdfPath}`);
  });
});

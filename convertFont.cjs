const fs = require("fs");
const path = require("path");

const fontPath = path.join(__dirname, "src/fonts/NotoSansBengali-Regular.ttf");
const outputPath = path.join(__dirname, "src/fonts/NotoSansBengali-Regular.js");

// Read font and convert to base64
const fontData = fs.readFileSync(fontPath).toString("base64");

// Save as JS file
fs.writeFileSync(
  outputPath,
  `export const NotoSansBengaliRegular = "${fontData}";\n`
);

console.log("✅ Bangla font converted to Base64 and saved as JS file.");

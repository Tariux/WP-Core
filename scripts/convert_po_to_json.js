import fs from "fs";
import path from "path";
import gettextParser from "gettext-parser";

const SOURCE_FOLDER = "./languages"; // Folder containing .po files
const TARGET_FOLDER = "./src/locales"; // Output folder for .json files

// Ensure target folder exists
if (!fs.existsSync(TARGET_FOLDER)) {
  fs.mkdirSync(TARGET_FOLDER, { recursive: true });
}

const convertPoToJson = (poFilePath, jsonFilePath) => {
  try {
    const poData = fs.readFileSync(poFilePath);
    const parsed = gettextParser.po.parse(poData);

    const translations = {};
    Object.keys(parsed.translations[""]).forEach((key) => {
      if (key) {
        translations[key] = parsed.translations[""][key].msgstr[0] || key;
      }
    });

    fs.writeFileSync(jsonFilePath, JSON.stringify(translations, null, 2));
    console.log(`✅ Converted: ${poFilePath} → ${jsonFilePath}`);
  } catch (error) {
    console.error(`❌ Error processing ${poFilePath}:`, error.message);
  }
};

// Read all .po files from the source folder
fs.readdir(SOURCE_FOLDER, (err, files) => {
  if (err) {
    console.error("❌ Error reading source folder:", err.message);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith(".po")) {
      const langCode = path.basename(file, ".po"); // Extract language code (e.g., "fa" from "fa.po")
      const poFilePath = path.join(SOURCE_FOLDER, file);
      const jsonFilePath = path.join(TARGET_FOLDER, `${langCode}.json`);

      convertPoToJson(poFilePath, jsonFilePath);
    }
  });
});

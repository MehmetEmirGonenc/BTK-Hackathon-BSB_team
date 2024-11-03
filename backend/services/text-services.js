const util = require("util");
const { exec } = require("child_process");
const execPromise = util.promisify(exec);

const { stdout, stderr } = require("process");

const path = require("path");
const fs = require("fs");

const extractText = async (filePath) => {
  //bu da js ye cevirilebilir
  try {
    const extractScriptPath = path.join(
      __dirname,
      "./py-scripts/extract-text.py"
    );
    const { stdout, stderr } = await execPromise(
      `python3 ${extractScriptPath} "${filePath}"`
    );
    return stdout.trim(); //returns path of txt file which generated from pdf
  } catch (e) {
    console.log("extractText");
    console.error(e);
  }
};

const readText = (filePath) => {
  try {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Dosya okuma hatası:", err);
        return;
      }
      return data;
    });
  } catch (e) {
    console.log("readText");
    console.error(e);
  }
};

module.exports = {
  extractText,
  readText,
};

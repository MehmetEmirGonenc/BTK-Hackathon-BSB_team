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

const readText = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return data;
  } catch (e) {
    console.error("Error reading file:", e);
    return null;
  }
};


module.exports = {
  extractText,
  readText,
};

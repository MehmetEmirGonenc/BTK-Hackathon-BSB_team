const util = require("util");
const { exec } = require("child_process");
const execPromise = util.promisify(exec);

const { stdout, stderr } = require("process");

const path = require('path');


const summaryText = async (filePath, context) => {
  try {
    const summaryScriptPath = path.join(__dirname, "./py-scripts/summary.py");
    const { stdout, stderr } = await execPromise(
      `python3 ${summaryScriptPath} ${filePath} ${context}`
    );
    return stdout.trim();
  } catch (e) {
    console.log("summaryText");
    console.error(e);
  }
};

const questFromText = async (filePath, context) => {
    try {
      const summaryScriptPath = path.join(__dirname, "./py-scripts/quest.py");
      const { stdout, stderr } = await execPromise(
        `python3 ${summaryScriptPath} ${filePath}`
      );
      return stdout.trim();
    } catch (e) {
      console.log("questFromTest");
      console.error(e);
    }
  };

module.exports = {
    summaryText,
    questFromText,
}

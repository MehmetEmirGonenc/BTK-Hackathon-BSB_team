import { GoogleGenerativeAI } from "@google/generative-ai";
const fs = require("fs");

const genAI = new GoogleGenerativeAI("AIzaSyDqC5cme1DLiVksst_l5KDWOJ8o842Gj_I");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function summary(file_path, context = "") {
  const document = fileToGenerativePart(file_path, "application/pdf");
  if (length(context) < 1) {
    context = "All File";
  }

  const prompt = `Create a lecture note summary on ${context}. Use the given document as a source.`;
  const generatedContent = await model.generateContent([document,prompt]);
  return generatedContent.response; // json ama string de yapılır
}

module.exports = summary; // yaptım bi şeyler ama bir bilene sormak gerek
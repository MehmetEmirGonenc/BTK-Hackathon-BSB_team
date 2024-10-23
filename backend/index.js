import express from "express";
import path from "path";

const app = express();
const PORT = 5000;

app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const pythonScriptPath = path.join(__dirname, '../src/convertions.py');  // Python scriptine giden yol
  
    // Python scriptini çalıştırma
    exec(`python3 ${pythonScriptPath} ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: 'Failed to process file' });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: 'Processing error' });
      }
  
      // Python scriptinden dönen metni JSON olarak döndür
      res.json({ text: stdout });
    });
  });



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
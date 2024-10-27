const express = require("express");
const path = require("path");
const upload = require('./utils/upload.js');
const { exec } = require("child_process");
const { error } = require("console");
const { stdout, stderr } = require("process");

const app = express();
const PORT = 5000;

app.post("/upload", upload.single("file"), (req,res,next) => {
    

    const context = req.body.context;
    
    const pythonScriptPath = path.join(__dirname, './services/summary.py');
    console.log(context);
    console.log(req.file.path);

    exec(`python3 ${pythonScriptPath} ${req.file.path} "${context}"`,(error,stdout,stderr)=>{
        if(error){
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to process file' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Processing error' });
        }

        res.json({ text: stdout });
    })
})

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
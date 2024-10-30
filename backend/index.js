const express = require("express");
const path = require("path");
const upload = require('./utils/upload.js');
const session = require('express-session');
const { exec } = require("child_process");
const { error } = require("console");
const { stdout, stderr } = require("process");
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 10 * 60 * 1000, // 10 dakika
      httpOnly: true,         // JavaScript erişimini engeller
      secure: false,          // HTTPS üzerinde aktif et, geliştirme için false
      sameSite: 'lax'         // CSRF koruması
    }
  }));

app.use((req, res, next) => {
    if (!req.session) return next();
  
    // Oturum sona erdiğinde veya silindiğinde dosyayı sil
    req.session.destroy(err => {
      if (err) return next(err);
      if (req.session.uploadedFile) {
        const filePath = path.join(__dirname, 'temp', req.session.uploadedFile);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Dosyayı sil
        }
      }
    });
    next();
  });

//#region routes

app.post("/summary", upload.single("file"), async(req,res,next) => {
    

    var path ;
    const context = req.body.context;
    
    console.log(context);
    console.log(req.file.path);

    var pythonScriptPath = path.join(__dirname, './services/extract-text.py');
    await exec(`python3 ${pythonScriptPath} ${req.file.path}`,(error,stdout,stderr)=>{//document to txt
        
        if(error){
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to process file' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Processing error' });
        }
        
        console.log({ text: stdout });
    })

    var pythonScriptPath = path.join(__dirname, './services/extract-text.py');
    await exec(`python3 ${pythonScriptPath} ${req.file.path}`,(error,stdout,stderr)=>{//txt to summary
        
        if(error){
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to process file' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Processing error' });
        }
        console.log({ text: stdout });
    })




    //res.json({ text: stdout });
})


app.use("*", (req, res, next) => {
    res.status(404).json("Bulunamadı");
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
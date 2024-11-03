const express = require("express");
const path = require("path");
const upload = require('./utils/upload.js');
const session = require('express-session');
const { exec } = require("child_process");
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

app.post("/summary", upload.single("file"), async(req, res, next) => {
    if (!req.session.userId) { 
      req.session.userId = `user_${Date.now()}`; // Her kullanıcıya benzersiz bir ID verin
    }
    
    const context = req.body.context;

    const pythonScriptPath = path.join(__dirname, './services/summary.py');

    console.log(context);

    console.log(req.file.path);

  await  exec(`python3 ${pythonScriptPath} ${req.file.path} "${context}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to process file' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Processing error' });
        }

        console.log(stdout);
        res.json({ message: 'Oturum başlatıldı', sessionId: req.session.userId, text: stdout });
    });
});

app.use((req, res, next) => {
    if (!req.session) return next();
  
    req.session.destroy(err => {
      if (err) return next(err);

      if (req.session.uploadedFile) {
        const filePath = path.join(__dirname, 'temp', req.session.uploadedFile);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Dosyayı sil
        }
      }
  
      next();
    });
});

app.use("*", (req, res) => {
    res.status(404).json("Bulunamadı");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

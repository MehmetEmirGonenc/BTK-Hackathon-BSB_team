const express = require("express");
const path = require("path");
const upload = require("./utils/upload.js");
const session = require("express-session");
//const { exec } = require("child_process");
const { error } = require("console");
const { stdout, stderr } = require("process");
require("dotenv").config();
const fs = require('fs');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function readFileContent() {
  try {
      // Dosyayı oku
      const data = await fs.readFile(filePath, 'utf-8'); // 'utf-8' kodlaması ile oku
      console.log('Dosya içeriği:', data); // İçeriği konsola yazdır
      return data; // İçeriği bir string olarak döndür
  } catch (error) {
      console.error('Hata:', error); // Hata durumunda hata mesajını yazdır
  }
}



const app = express();
const PORT = 5000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000, // 10 dakika
      httpOnly: true, // JavaScript erişimini engeller
      secure: false, // HTTPS üzerinde aktif et, geliştirme için false
      sameSite: "lax", // CSRF koruması
    },
  })
);

app.post("/summary", upload.single("file"), async (req, res, next) => {
  const context = req.body.context;
  var tmpResponse = "";
  try {
    const extractScriptPath = path.join(__dirname, "/services/extract-text.py");
    const { stdout, stderr } = await exec(`python3 ${extractScriptPath} ${req.file.path}`);
    console.log('stdout:', stdout);
    tmpResponse = stdout;
    console.log('stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }

  try{
    const summaryScriptPath = path.join(__dirname, "./services/summary.py");
    console.log(`python3 ${summaryScriptPath} ${tmpResponse.replace(/\n/g, '')} ${context}`);
    console.log(`python3 ${summaryScriptPath} ${tmpResponse.replace(/\n/g, '')} ${context}`);
    const { stdout, stderr }= await exec(`python3 ${summaryScriptPath} ${tmpResponse.replace(/\n/g, '')} ${context}`);//.replace(/\n/g, '')
    console.log('stdout:', stdout);
    tmpResponse = stdout.replace(/\n/g, '');
    console.log('stderr:', stderr);
  
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }

  fs.readFile(tmpResponse, 'utf8', (err, data) => {
    if (err) {
        console.error('Dosya okuma hatası:', err);
        return;
    }


    res.json({
      message: "File uploaded successfully",
      fileName: req.session.uploadedFile,
      response: data,
  
    });
});




});

/*
app.use((req, res, next) => {
  // Eğer oturum yoksa, işlemi tamamlayın
  if (!req.session) return next();

  // Oturum sona erdiğinde veya silindiğinde dosyayı sil
  req.session.destroy((err) => {
    if (err) return next(err);

    // Burada req.session'in null olmadığını varsayıyoruz
    if (req.session.uploadedFile) {
      const tmpResponse = path.join(__dirname, "temp", req.session.uploadedFile);
      if (fs.existsSync(tmpResponse)) {
        fs.unlinkSync(tmpResponse); // Dosyayı sil
      }
    }

    next(); // İşlemi devam ettirin
  });
});*/


app.use("*", (req, res, next) => {
  res.status(404).json("Bulunamadı");
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

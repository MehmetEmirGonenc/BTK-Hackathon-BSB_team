const express = require("express");
const session = require("express-session");
const { error } = require("console");
require("dotenv").config(); //??
const fs = require("fs");


const upload = require("./utils/upload.js");
const { extractText, readText } = require("./services/text-services.js");
const { summaryText, questFromText, narrativeFromText } = require("./services/ai-services.js");

const path = require("path");

const app = express();
const PORT = 5000;

var summaryPath = "";

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

  const filePath = req.file.path;
  const context = req.body.context;

  var tmpResponse = "";

  tmpResponse = await extractText(filePath);

  tmpResponse = await summaryText(tmpResponse, context);

  if (!tmpResponse) {
    console.error("tmpResponse is undefined or empty");
    return res.status(500).json({ error: "Internal Server Error" });
  }

  summaryPath = tmpResponse;
  fs.readFile(tmpResponse, "utf8", (err, data) => {
    if (err) {
      console.error("Dosya okuma hatası:", err);
      return;
    }

    res.json({
      message: "File uploaded successfully",
      fileName: req.session.uploadedFile,
      response: data,
     });
   });
});

app.post("/test", upload.single("file"), async (req, res, next) => {
  const filePath = req.file.path;
  const context = req.body.context;
  var tmpResponse = "";

  tmpResponse = await extractText(filePath);

  tmpResponse = await summaryText(tmpResponse, context);

  tmpResponse = await narrativeFromText(tmpResponse);

  fs.readFile(tmpResponse, "utf8", (err, data) => {
    if (err) {
      console.error("Dosya okuma hatası:", err);
      return;
    }

    res.json({
      message: "File uploaded successfully",
      fileName: req.session.uploadedFile,
      response: data,
     });
   });
});

app.post("/A", upload.single("file"), async (req, res, next) => {//A yerine narrative yazinca calismiyor
  const filePath = req.file.path;
  const context = req.body.context;
  var tmpResponse = "";

  tmpResponse = await extractText(filePath);

  tmpResponse = await summaryText(tmpResponse, context);

  tmpResponse = await narrativeFromText(tmpResponse);

  fs.readFile(tmpResponse, "utf8", (err, data) => {
    if (err) {
      console.error("Dosya okuma hatası:", err);
      return;
    }

    res.json({
      message: "File uploaded successfully",
      fileName: req.session.uploadedFile,
      response: data,// bu yapilarin formatini degistirmemeiz lazim
     });
   });
});

//BURA HEM CALISMIYOR HEM DE HATA VERIYOR olabilir bilmiyorum

// app.use((req, res, next) => {
//   // Eğer oturum yoksa, işlemi tamamlayın
//   if (!req.session) return next();

//   // Oturum sona erdiğinde veya silindiğinde dosyayı sil
//   req.session.destroy((err) => {
//     if (err) return next(err);

//     // Burada req.session'in null olmadığını varsayıyoruz
//     if (req.session.uploadedFile) {
//       const tmpResponse = path.join(__dirname, "temp", req.session.uploadedFile);
//       if (fs.existsSync(tmpResponse)) {
//         fs.unlinkSync(tmpResponse); // Dosyayı sil
//       }
//     }

//     next(); // İşlemi devam ettirin
//   });
// });

app.use("*", (req, res, next) => {
  res.status(404).json("Bulunamadı");
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

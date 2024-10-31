const express = require("express");
const path = require("path");
const upload = require("./utils/upload.js");
const session = require("express-session");
const { exec } = require("child_process");
const { error } = require("console");
const { stdout, stderr } = require("process");
require("dotenv").config();

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

app.post("/summary", upload.single("file"), async(req, res, next) => {
  res.json({
    message: "File uploaded successfully",
    fileName: req.session.uploadedFile,
  });
  const context = req.body.context;

  console.log(context);//
  console.log(req.file.path);

  var textPath;
  var pythonScriptPath = path.join(__dirname, "./services/extract-text.py");

  await exec(`python3 ${pythonScriptPath} ${req.file.path}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Failed to process file" });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: "Processing error" });
      }

      console.log("stdout pdf2text:");
      console.log({ text: stdout });//loglamıyor 
    }
  );

  // pythonScriptPath = path.join(__dirname, "./services/summary.py");
  // await exec(`python3 ${pythonScriptPath} *${textPath}`,
  //   (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`Error: ${error.message}`);
  //       return res.status(500).json({ error: "Failed to process file" });
  //     }
  //     if (stderr) {
  //       console.error(`stderr: ${stderr}`);
  //       return res.status(500).json({ error: "Processing error" });
  //     }

  //     console.log({ text: stdout });
  //   }
  // );

  console.log("done");

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
      const filePath = path.join(__dirname, "temp", req.session.uploadedFile);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Dosyayı sil
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

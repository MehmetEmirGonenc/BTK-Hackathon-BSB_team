const path = require("path");
const multer = require("multer");
const session = require('express-session');
const { execPath } = require("process");
const fs = require('fs');

const uploadDir = path.join(__dirname,"../uploads");


const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};  

createFolderIfNotExists(uploadDir)


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now()
//     cb(null, uniqueSuffix+"-"+file.originalname);
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileName = `${req.session.id}-${file.originalname}`;
    req.session.uploadedFile = fileName; // Oturumda dosya adını sakla
    cb(null, fileName);
  },
});

const upload = multer({storage:storage});

module.exports = upload;








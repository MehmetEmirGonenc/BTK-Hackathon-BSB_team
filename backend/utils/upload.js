const path = require("path");
const multer = require("multer");
const { execPath } = require("process");

const uploadDir = path.join(__dirname,"../uploads");

// const createFolderIfNotExists = (folderPath) => {
//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath, { recursive: true });
//   }
// };  
// createFolderIfNotExists(uploadDir)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix+"-"+file.originalname);
  },
});

const upload = multer({storage:storage});

module.exports = upload;








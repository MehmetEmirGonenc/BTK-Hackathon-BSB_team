import multer from 'multer';

const uploadDir = path.join(__dirname, './uploads');

const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

createFolderIfNotExists(uploadDir)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Orijinal dosya adını kullan
    }
  });

  const upload = multer({ storage: storage });

  export {upload};
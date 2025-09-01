import multer from "multer";

// Configure storage for Multer
const storage = multer.diskStorage({
  // Define the destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); 
  },
  // Define the filename to be saved
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the Multer upload instance
const upload = multer({ storage: storage });

export default upload;
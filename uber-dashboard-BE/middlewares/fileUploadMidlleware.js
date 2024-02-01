import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const handleFileUpload = upload.single("productImage");
export {handleFileUpload};
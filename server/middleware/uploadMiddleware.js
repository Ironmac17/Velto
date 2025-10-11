const multer= require('multer');

// const storage= multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

const storage = multer.memoryStorage();

const fileFilter= (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png' , 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    } else{
        cb(new Error('Invalid file type. Only JPEG, PNG AND JPG are allowed'), false);
    }
};

const upload=multer({ storage, fileFilter});

module.exports=upload;
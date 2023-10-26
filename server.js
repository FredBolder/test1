import express from 'express';
import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const app = express();
const PORT = 3000;

app.post('/', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})

app.get('/', (req, res) => {
    const __dirname = process.cwd();
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}.`);
});

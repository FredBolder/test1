import express from 'express';
import dotenv from "dotenv";
import multer from 'multer';
import path from "path";
import {fileURLToPath} from 'url';

dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, './')));

const PORT = process.env.PORT || 4000;

app.post('/', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.send("File uploaded");
})

app.get('/', (req, res) => {
    //const __dirname = process.cwd();
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}.`);
});

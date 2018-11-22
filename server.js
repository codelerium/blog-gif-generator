const express = require('express');
const app = express();
const cors = require('cors')
const multer = require('multer');
const GIFEncoder = require('gifencoder');
const pngFileStream = require('png-file-stream');
const fs = require('fs');

app.use(cors());
app.use(express.static('public'));

const multipartUpload = multer({
    storage: multer.diskStorage({
        destination: './uploads/',
        filename: function (req, file, callback) { 
            callback(null, file.fieldname); 
        },
    })
}).any();

app.post('/data', multipartUpload, (req, res) => {
    res.json({ success: true });
});

app.get('/generate', (req, res) => {
    const encoder = new GIFEncoder(800, 600);
    pngFileStream('uploads/**/forward-kinematics-????.png')
        .pipe(encoder.createWriteStream({ repeat: 0, delay: 0.1, quality: 10 }))
        .pipe(fs.createWriteStream('forward-kinemtaics-5.gif'));

    res.send('Generating gif!');
});

app.listen(3030, () => {
    console.log('Gif generator listening on port: 3030')
});
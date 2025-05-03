// app.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'filestorage/');
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname}-${Date.now()}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'filestorage')));

app.get('/', (req, res) => {
  res.render('index')
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/')
});

app.delete('/delete/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'filestorage', fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.send(`File "${fileName}" has been deleted.`);
  } else {
    res.status(404).send(`File "${fileName}" not found.`);
  }
});

app.get('/view', (req, res) => {
  const uploadDirectory = path.join(__dirname, 'filestorage');
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading the upload directory.');
    } else {
      res.json({ files });
    }
  });
});
//connsct to the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

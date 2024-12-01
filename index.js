var express = require('express');
var cors = require('cors');
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

const uploadFile = multer({ dest: 'uploads' })

app.post('/api/fileanalyse', uploadFile.single('upfile'), (req, res) => {
  var info = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(info);
});
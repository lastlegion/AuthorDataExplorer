var express = require('express');
var router = express.Router();
var fs = require('fs')

var multer = require('multer');


var upload = multer({dest:'uploads/'});

var cpUpload = upload.single('postImg');
/*
router.post('/upload', cpUpload, function(req,res){

  console.log(req.file);
  res.redirect('/');

});
*/



router.post('/', function (req, res, next) {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file) {

        console.log("Uploading: " + fieldname);
        console.log(fieldname)
        //Path where image will be uploaded
        fstream = fs.createWriteStream(__dirname + '/../data/' + fieldname);
        file.pipe(fstream);
        fstream.on('close', function () {    
            console.log("Upload Finished of " + fieldname);              
            res.redirect('back');           //where to go next
        });
    });
});

module.exports = router;

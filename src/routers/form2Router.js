const express = require('express');
const router = express.Router();
const multer = require('multer');
const emptyFolder = require('../utils/emptyFolder');
const path = require('path');
const convertXFile = require('../utils/readExcel');
const XLSX = require('xlsx');
const moment = require("moment");

// empty folder content every time
const uploadFolder = "../public/uploads/";
const downloadFolder = "../public/download/";
emptyFolder(uploadFolder);
emptyFolder(downloadFolder);
const newDate = new Date();

const storage = multer.diskStorage({
    destination: uploadFolder,
    filename: function(req,file,cb){
        cb(null, file.originalname.split(".")[0] + '-' + Date.now() + '.' + file.originalname.split(".")[1]) 
    }
})

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000 // 1MB
    },
    fileFilter(req, file, cb){
        
        let fileTypes = /\.(csv|xlsx|xls)$/;
        let mimeTypes = /application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|application\/vnd\.ms-excel|test\/csv/
        let testExt = fileTypes.test(path.extname(file.originalname).toLowerCase());
        let testMimeType = mimeTypes.test(file.mimetype);

        if(testExt && testMimeType){
            return cb(null, true)
        } else {
            return cb(new Error("File type must be excel or csv!"))
        }



}}).single("uploadzone");




router.post('/form2', (req, res, next)=>{
    // req body is made by urlencoded, whcih parses the http message for sent data!
    try {
        
        
        
        upload(req, res, async (err)=>{

            let emdate = moment().format(req.body.emdate);
            let currentDate = moment().format(newDate.toISOString());


            if(err){
                res.render("errPage", {
                    errMsg: err
                })
            } else {
                if(req.file === undefined){
                    res.render("errPage", {
                        errMsg: "No file is uploaded."
                    })
                } else if (emdate === undefined){
                    res.render("errPage", {
                        errMsg: "Emergence date is empty."
                    })
                } else  if (emdate > currentDate ){
                    res.render("errPage", {
                        errMsg: "Picked Date is beyond current date"
                    })
                } 
                else {
                    
                    let cutoff = 90;
                    let fileName = req.file.filename;
                    let uploadedPath = path.resolve(path.join(uploadFolder, fileName));

                    try {
                        let JSONout = await convertXFile(uploadedPath, emdate, cutoff);
                        newSheet = XLSX.utils.json_to_sheet(JSONout);
    
                        let wb = XLSX.utils.book_new();
                        let savePath = path.join(path.resolve(downloadFolder), req.file.filename);
                        let outputName = "result-" + Date.now();
                        XLSX.utils.book_append_sheet(wb, newSheet, outputName);
                        XLSX.writeFile(wb, savePath);
                        
                        res.render("userTable", {
                            downloadLink: `/download/${fileName}`,
                            rowTable: JSONout
                        })
                    } catch(error){
                        res.render("errPage", {
                            errMsg: error
                        })
                    }

                    
                }
                
            }

        })
    

    } catch (error) {
        res.render("errPage", {
            errMsg: error
        })
        
    }

});

module.exports = router;
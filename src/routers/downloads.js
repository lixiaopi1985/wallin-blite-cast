const express = require('express');
const router = express.Router();
const path = require('path');

const downloadFolder = "../public/download/";


router.get("/download/:id", (req, res, next)=>{

    
    let filepath = path.resolve(req.url);
    
    
    try {
        
        console.log(filepath);
        
        if( filepath === undefined ){
            res.download(filepath);
        } else {
            res.render("errPage", {
                errMsg: "No file to download"
            })
        }
    } catch(error) {
        res.render("errPage", {
            errMsg: `[Sever Error]An error happened during download request: ${error}`
        })
    }
    
    

})


module.exports = router;
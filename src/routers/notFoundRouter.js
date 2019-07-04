const express = require('express');
const router = express.Router();


router.get('*', (req, res)=>{
    res.render('errPage', {
        errMsg: "Please check if URL is correct"
    })
})



module.exports = router;
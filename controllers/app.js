const express = require('express');
const router  = express.Router();
const path = require('path');



router.get('/', function (req, res) {
    console.log("hello");
    // res.sendFile(path.join(__dirname,'../index.html'))
    res.json({hello : "hello World !"})
  })



module.exports = router;
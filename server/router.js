const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res)=> {
    res.send('server is up and running');
   // res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = router;
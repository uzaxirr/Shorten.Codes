const express = require('express');
const path = require('path')
const router = require('express').Router();

const bodyParser = require('body-parser');

router.get('/', (req.body,res) => {
    console.log(req.body);
    res.sendFile(path.join(__dirname, '../src/index.html'));
})



module.exports = router;

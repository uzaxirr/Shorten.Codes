const express = require('express');
const router = express.Router();

const URLSchemaMongo = require('../models/urlModel');
const { route } = require('./url');

router.get('/:code',  (req, res) => {
    try {
        const URLFound =  URLSchemaMongo.findOne({urlCode: req.params.code});
        if(URLFound){ return res.redirect(URLFound.longUrl)} 
        else
        {
            return res.status(404).json("URL Not Found");
        }

    }
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

module.exports = router;
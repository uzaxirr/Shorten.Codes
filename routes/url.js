const express = require('express');
const ValidURL = require('valid-url');
const shortID = require('shortid');
const URLSchemaMongo = require('../models/urlModel') ;
const shortid = require('shortid');

const router = express.Router();

const baseURL = "https://localhost:5000/";

router.post('/shorten', (req, res) => {
    const {
        longUrl
    } = req.body

    if(!ValidUrl.isUri(baseURL))
    {
        return res.status(401).json('Invalid base URL');
    }
    else
    {
        const urlCode = shortid.generate();

        if(ValidUrl.isUri(longUrl))
        {
            var foundURL = await URLSchemaMongo.findOne({longUrl});
            if(foundURL) {res.json(foundURL);}
            else 
            {
                const shortURL = baseURL+urlCode;
                foundURL = new URLSchemaMongo({
                    longUrl,
                    shortURL,
                    urlCode,
                    date = new Date()
                })
                await foundURL.save()
                res.json(url)
            }
        }
        else
        {
            res.status(401).json("Invalid URL")
        }
    }
    
})

module.exports = router;

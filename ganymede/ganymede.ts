const express = require('express');
const path = require('path');
const { fork } = require('child_process');
const bodyParser = require('body-parser');
const config = require('./config.ts');
const db = require('./db');


//connecting to database
const url = config.database.url

db(url);

// creating server 
const app = express();
app.use(bodyParser.json());


//post
app.post('/api/product/search', async (req, res) => {
    //console.log(req.body.query);
    const searchProcess = fork(`./themisto.js`);
    
    
    searchProcess.on('message', msg => {
        console.log(`[GANYMEDE] Received data from Themisto`);
        res.send(msg)
    });

    searchProcess.send(req.body.query);
    
})


app.listen(config.api.port, () => {
    console.log(`API listening on ${config.api.port} port`);
})
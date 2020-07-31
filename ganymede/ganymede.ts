const express = require('express');
const path = require('path');
const { fork } = require('child_process');
const bodyParser = require('body-parser');
const config = require('./config.ts');
const db = require('./db');


//connecting to database
const url = config.database.url

db.connect(url);

// creating server 
const app = express();
app.use(bodyParser.json());


//Add new search order
app.post('/api/product/search', async (req, res) => {
    //console.log(req.body.query);
    const searchProcess = fork(`./themisto.js`);
    
    
    searchProcess.on('message', msg => {
        //Receiving the results from Themisto and sending back to the client
        console.log(`[GANYMEDE] Received data from Themisto`);
        res.send(msg)

        //Updating the products in the search order


    });

    

    //Sending the search order to Themisto
    searchProcess.send(req.body.query);
    
});

app.get('/api/product/search-orders', async (req, res) => {

    const allOrders = await db.getAllOrders();

    
});


app.listen(config.api.port, () => {
    console.log(`API listening on ${config.api.port} port`);
})
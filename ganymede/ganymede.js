const express = require('express');
const path = require('path');
const { fork } = require('child_process');
const bodyParser = require('body-parser');
const config = require('./config');
const db = require('./db');
const SearchOrder = require('./model/searchOrders');


//connecting to database
const url = config.database.url

db.connect(url);

// creating server 
const app = express();
app.use(bodyParser.json());


//Add new search order
app.post('/api/product/search', async (req, res) => {
    
    //Init search order
    const validOrder = new SearchOrder(req.body);
    const savedOrder = await db.addOrder(validOrder);

    if (savedOrder) {
        
        const searchProcess = fork(`./themisto.js`);
        searchProcess.on('message', msg => {
            //Receiving the results from Themisto and sending back to the client
            console.log(`[GANYMEDE] Received data from Themisto`);
            
    
            //Updating the products in the search order
    
    
        });

        //Sending the search order to Themisto
        searchProcess.send(savedOrder);
    }else {

    }
    
    
    

    

    
});

app.get('/api/product/search-orders', async (req, res) => {

    const allOrders = await db.getAllOrders();
    res.send(allOrders);
    
});


app.listen(config.api.port, () => {
    console.log(`API listening on ${config.api.port} port`);
})
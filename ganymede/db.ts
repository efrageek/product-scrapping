const database = require('mongoose');
const SearchOrder = require('./model/searchOrders');

//Creating database connection
async function connect(url) {

    //Checking connection 
    database.connection.once('open', () => {
        console.log('[DB] Connection has been made')
    })

    try {
        await database.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });

    } catch (err) {
        console.log(`[database] Connection error: ${err}`)
    }

};



async function getAllOrders() {
    try {
        const allOrders = SearchOrder.find();
        console.log(allOrders);
        return allOrders 
    } catch (error) {
        console.log(`[DB] error getting all orders from DB: ${error}`);
    }
}

module.exports = {
    connect,
    getAllOrders
};
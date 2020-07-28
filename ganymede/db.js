const db = require('mongoose');

//Creating database connection
async function connect(url) {

    //Checking connection 
    db.connection.once('open', () => {
        console.log('[DB] Connection has been made')
    })

    try {
        await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });

    } catch (err) {
        console.log(`[DB] Connection error: ${err}`)
    }

};

module.exports = connect;
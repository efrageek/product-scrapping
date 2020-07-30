
process.env.DBUSER = 'sirena_admin';
process.env.DBPASS = 'f8vzIgHHTOMqYsRL';
process.env.TESTDBNAME = 'test';
process.env.DBNAME = 'productsscrapping'

const testName = process.env.TESTDBNAME;
const dbName = process.env.DBNAME;
const user = process.env.DBUSER;
const pass = process.env.DBPASS;


module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    database: {
        url: `mongodb+srv://${user}:${pass}@scrapping.lhpui.mongodb.net/${dbName}?retryWrites=true&w=majority`,
        testUrl: `mongodb+srv://${user}:${pass}@scrapping.lhpui.mongodb.net/${testName}?retryWrites=true&w=majority`
    }
}
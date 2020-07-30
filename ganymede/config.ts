
process.env.DBUSER = 'sirena_admin';
process.env.DBPASS = 'f8vzIgHHTOMqYsRL';
process.env.TESTDBNAME = 'scrapping';

const testName = process.env.TESTDBNAME;
const name = process.env.DBNAME;
const user = process.env.DBUSER;
const pass = process.env.DBPASS;


module.exports = {
    api: {
        port: process.env.API_PORT || 8000
    },
    database: {
        url: `mongodb+srv://${user}:${pass}@scrapping.lhpui.mongodb.net/${name}?retryWrites=true&w=majority`,
        testUrl: `mongodb+srv://${user}:${pass}@scrapping.lhpui.mongodb.net/${testName}?retryWrites=true&w=majority`
    }
}
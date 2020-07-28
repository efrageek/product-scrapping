
process.env.DBUSER = 'sirena_admin';
process.env.DBPASS = 'f8vzIgHHTOMqYsRL';
process.env.DBNAME = 'scrapping';

const dbname = process.env.DBNAME;
const user = process.env.DBUSER;
const pass = process.env.DBPASS;


module.exports = {
    api: {
        port: process.env.API_PORT || 8000
    },
    database: {
        url: `mongodb+srv://${user}:${pass}@scrapping.lhpui.mongodb.net/${dbname}?retryWrites=true&w=majority`
    }
}
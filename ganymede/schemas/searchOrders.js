const db = require('mongoose');
const Schema = db.Schema;

const searchOrderSchema = new Schema({
    query: String,
    provider: String,
    options: {
        user: String,
        password: String
        },
    status: { type: String, default: 'received'},
    callbackUrl: String,
    products: [{ type: Schema.ObjectId, ref: 'products'}]

})

const SearchOrder = db.model('searchorder', searchOrderSchema);

module.exports = SearchOrder;
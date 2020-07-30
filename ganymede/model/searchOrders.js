const db = require('mongoose');
const Schema = db.Schema;

const searchOrderSchema = new Schema({
    query: { type: String, required: true },
    provider: { type: String, required: true },
    options: {
        user: { type: String, required: true },
        password: { type: String, required: true }
        },
    status: { type: String, default: 'received'},
    callbackUrl: { type: String, required: true },
    products: [{ type: Schema.ObjectId, ref: 'products'}]

})

const SearchOrder = db.model('searchorder', searchOrderSchema);

module.exports = SearchOrder;
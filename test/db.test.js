const db = require('mongoose');
const database = require('../ganymede/db');
const SearchOrder = require('../ganymede/model/searchOrders');
const config = require('../ganymede/config');

//mocking search order data
const orderData = {
    query: 'silla',
    provider: 'easy',
    options: {
        user: '[a username]',
        password: '[a password]'
    },
    status: 'received',
    callbackUrl: 'http://my-endpoint.com/results'
}

beforeAll(async () => {
    // Connect to a Mongo DB
    await db.connect(config.database.testUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    
    await db.connection.collections.searchorders.drop();
    
});

test('create & save search order successfully', async () => {
    const validOrder = new SearchOrder(orderData);
    const savedOrder = await validOrder.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedOrder._id).toBeDefined();
    expect(savedOrder.query).toBe(orderData.query);
    expect(savedOrder.provider).toBe(orderData.provider);
    expect(savedOrder.options.user).toBe(orderData.options.user);
    expect(savedOrder.options.password).toBe(orderData.options.password);
    expect(savedOrder.status).toBe(orderData.status);
    expect(savedOrder.callbackUrl).toBe(orderData.callbackUrl);
});

test('finding saved order', async () => {
    
    const result = await SearchOrder.findOne( {query:'silla'} );

    expect(result.query === orderData.query);
});

test('finding all orders', async () => {
    const results = [];
    const result = await SearchOrder.find();
    results.push(result);

    expect(result.length > 0);
});

//testing db.js methods

test('getAllOrders method is returning something', async () => {
    const result = await database.getAllOrders();
    
    expect(result).toBeDefined();
});
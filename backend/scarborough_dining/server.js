const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established succesfully');
});

const customersRouter = require('./routes/customers');
const ownersRouter = require('./routes/owners');
const restaurantsRouter = require('./routes/restaurants');
const menuItemsRouter = require('./routes/menu_items');

app.use('/customers', customersRouter);
app.use('/owners', ownersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/menu_items', menuItemsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

/**
 * Middle ware used in server-side
 */
app.use(cors());
app.use(fileupload({ useTempFiles: true }));
app.use(express.json());

/**
 * Connect server to MongoDB using environment variables.
 */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established succesfully');
});

/**
 * Server-side routers.
 */
const customersRouter = require('./routes/customers');
const ownersRouter = require('./routes/owners');
const restaurantsRouter = require('./routes/restaurants');
const menuItemsRouter = require('./routes/menu_items');
const uploadMediaItemsRouter = require('./routes/media_upload');

app.use('/customers', customersRouter);
app.use('/owners', ownersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/menu_items', menuItemsRouter);
app.use('/media_upload', uploadMediaItemsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
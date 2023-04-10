const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// db connection method
connectDB();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use('/queue', require('./routes/queue'));

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`API is now online at Port: ${port}`));
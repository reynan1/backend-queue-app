const mongoose = require('mongoose');

// connect db function 
const connectDB = async () => {
    try {
        mongoose.connect('mongodb+srv://admin:admin123@zuitt.qfnw1x1.mongodb.net/quequeApp?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        mongoose.connection.once('open', () => console.log('Now Connected to MongoDB'));
    } catch(error) {
        console.log(`DB connection error: ${error}`);
        process.exit(1);
    }
}

module.exports = connectDB;
const mongoose = require('mongoose');

const connectdb = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true},{useUnifiedTopology: true})
        console.log(`Connected to MongoDB : ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectdb;
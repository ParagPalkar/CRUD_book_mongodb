const mongoose  = require('mongoose');

var schema = mongoose.Schema({
    name:{type:String},
    author:{type:String},
    
})

const booksDB = mongoose.model('books',schema);
module.exports = booksDB;
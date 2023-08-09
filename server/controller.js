var bookDB = require('./model');

//Create new book
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    
    //new book
    const book = new bookDB({
        name:req.body.name,
        author:req.body.author
    })

    //save book in database
    book
        .save(book)
        .then(data => {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while adding book"
            });
        });
}

//Retrieve all books OR Single book
exports.find = (req,res)=>{
    if (req.query.id) {
        const id = req.query.id;

        bookDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found Book with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving book with id " + id})
            })
    } else {
        bookDB.find()
            .then(book => {
                res.send(book)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}    
    

//update a book by id
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    bookDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

//Delete a book
exports.delete = (req,res)=>{
    const id = req.params.id;

    bookDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Book was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Book = require('./models/bookModels')

const port = 4900;


app.use(express.json())

app.get('/', (req, res) => {
    res.send("Everything is working!")
})

app.get('/books', async (req, res) => {
    try {
        const book = await Book.find({});
        res.status(200).json(book) 
    } catch (error) {
        res.status (500).json({message: error.message})
    }
})

app.get('/books/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/books', async (req, res) => {
    try{
        const book = await Book.create(req.body)
        res.status(200).json(book) 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


app.put('/book/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        //If book is not found in the database
        if(!book){
            return res.status(404).json({message: `Book with an ID of ${id} cannot be found`})
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('books/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({message: `Book with an ID of ${id} cannot be found`})
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.
connect('mongodb+srv://cnnonso:1234567890@a-p-eye.yplqdxi.mongodb.net/?retryWrites=true&w=majority')
.then(() => {

    console.log("Connected to MongoDB")

    app.listen(3009, () => {
        console.log(`Node API app is running on port ${port}`)
    })
    

}).catch(() => {
    console.log(error)
})



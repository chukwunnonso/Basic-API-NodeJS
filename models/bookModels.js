const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide the name of the book of your choice"]
        },
        publisher: {
            type: String,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        } 
    },
    {
        timestamps: true
    }
    
)

const book = mongoose.model('book', bookSchema);

module.exports = book




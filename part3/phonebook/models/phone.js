const mongoose = require("mongoose")
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL
// // console.log('url ', url)
// const url = 'mongodb+srv://fullstack:fullstack@cluster0.gjrrlwl.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url)
        .then(res => console.log('connect'))
        .catch(err => console.log(err.message))
const phoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3
    },
    number: {
        type: String,
        match: /\d{2,3}\-?\d$/,
        minlength: 8
    }
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('PhoneBook', phoneBookSchema)
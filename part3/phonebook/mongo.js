const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
if(process.argv.length < 5){
    console.log("not enough arguments are provide. SHould be node.js mongo.js <pass> <name> <phonenumber> ")
    process.exit(1)
}
const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.gjrrlwl.mongodb.net/?retryWrites=true&w=majority`

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

mongoose.connect(url)
        // .then( (result) => {
        //     const contact = new PhoneBook({
        //         number: phoneNumber,
        //         name: name
        //     })
        //     return contact.save()
        // })
        // .then(()=>{
        //     console.log(`added ${name} number ${phoneNumber} to phonebook`)
        //     return mongoose.connection.close()
        // })
        // .catch(err => console.log(err))
PhoneBook.find(({}))
        .then(results => {
            results.forEach( contact => {
                console.log(contact)
            })
            mongoose.connection.close()
        })
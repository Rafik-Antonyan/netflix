const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const { UserRouter } = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://rafikantonyan105:XX5NJ7I4SAp7eAPX@cluster0.jzrpvec.mongodb.net/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected");
})

app.use("/api/user", UserRouter)

app.listen(5000, () => {
    console.log("server started on port 5000");
})


const express = require('express')
const path = require('path')
require("dotenv").config();
const productRouter = require("./api/Product/product.router")

const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:5173',
}

const app = express()

app.use(cors(corsOptions))

app.use("/",express.static(path.join(__dirname, "client")));


app.use("/api/product/", productRouter);


app.use((req, res)=>{
    res.status(404);
    res.send('<h1>Error 404: Resources are not found</h1>')
})

app.listen(3000, ()=> {
    console.log("app listening on port 3000")
})
const express = require('express')
const app = express()
const port = 5000;
const connectToMongoDB= require("./db.js");
const cors = require("cors");
connectToMongoDB();


app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  console.log("Hello World");
})

app.use('/api' , require("./Routes/CreateUser.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
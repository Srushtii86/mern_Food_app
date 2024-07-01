const express = require('express')
const cors = require("cors");

const app = express()
const port = 5000;
const connectToMongoDB= require("./db.js");

connectToMongoDB();


//Some Cors policy err occurs then execute this snippet
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log("Hello World");
})

app.use('/api' , require("./Routes/CreateUser.js"));
app.use('/api' , require("./Routes/DisplayData.js"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
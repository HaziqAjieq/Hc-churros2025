const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

const corsOption ={
  origin:["http://localhost:5174"],
};

app.use(cors(corsOption))

app.get('/api', (req , res) => {
  res.json({message : "express test server.js"});

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})


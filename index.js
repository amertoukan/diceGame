const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 4000 || 5000; 

const bodyParser = require('body-parser')
const app = express()

app.use('/', express.static (path.join(__dirname, ('public'))))
app.get('/', ( req, res ) => {
    res.sendFile('index.html')
})
app.listen(PORT, err => console.log(err ? err : `http://localhost:${PORT}`))
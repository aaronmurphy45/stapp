require("dotenv").config();
const express = require('express'); //Line 1
const app = express(); //Line 2

const api = require('./api'); //Line 3

app.use('/api', api); //Line 4

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname + './client/build')); //Line 5
    app.get('*', (req, res) => { //Line 6))
        res.sendFile(path.join(__dirname + 'client/build/index.html'));
    });
}
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

//app.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/public/index.html")));
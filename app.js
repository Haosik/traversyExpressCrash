const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Creating express app
let app = express();

// Creating Middleware function
// Order is important!
let logger = (req, res, next) => {
    console.log(`Logging...`);
    next();
}

app.use(logger);

// Routes
app.get('/', (req, res) => {
    res.send(`Hello World`);
});

// Starting express server
app.listen(3000, () => {
    console.log(`Server started on port 3000`)
});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Creating express app
let app = express();

// Creating Middleware function
// Order is important!
/*let logger = (req, res, next) => {
    console.log(`Logging...`);
    next();
}

app.use(logger);
*/

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set static path (folder)
app.use(express.static(path.join(__dirname, 'public')));

let people = [{
        id: 1,
        name: 'Jeff',
        age: 30
    }, {
        id: 2,
        name: 'Jop',
        age: 21
    },
    {
        id: 3,
        name: 'Lapidus',
        age: 14
    }

];

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'This is Traversy Express Crash',
        heading: 'Hello guyz!',
        people: people
    });
});

// Starting express server
app.listen(3000, () => {
    console.log(`Server started on port 3000`)
});
const express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
expressValidator = require('express-validator'),
util = require('util');

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
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// Express-Validator Middleware
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Set static path (folder)
app.use(express.static(path.join(__dirname, 'public')));

let people = [{
        id: 1,
        first_name: 'Jeff',
        age: 30,
        email: 'jeff@example.com'
    }, {
        id: 2,
        first_name: 'Jop',
        age: 21,
        email: 'jop@example.com'
    },
    {
        id: 3,
        first_name: 'Lapidus',
        age: 14,
        email: 'lapidus@example.com'
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

app.post('/users/add', (req, res) => {
    

    req.checkBody('first_name', 'First Name is required!').notEmpty();
    req.checkBody('age', 'Invalid age!').notEmpty().isInt();
    req.checkBody('email', 'Invalid email!').notEmpty().isEmail();

    let errors = req.validationErrors();
    if (errors) {
        console.log('ERRORS');
    } else {
        let newUser = {
            first_name: req.body.first_name,
            age: req.body.age,
            email: req.body.email
        };
        console.log('SUCCESS');
    }

})

// Starting express server
app.listen(3000, () => {
    console.log(`Server started on port 3000`)
});
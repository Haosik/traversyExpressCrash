const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    expressValidator = require('express-validator'),
    util = require('util'),
    mongojs = require('mongojs'),
    db = mongojs('expressCrash', ['users']),
    ObjectId = require('mongodb').ObjectID;


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

// View (template) Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set static path (folder)
app.use(express.static(path.join(__dirname, 'public')));

// Global Variables
app.use((req, res, next) => {
    res.locals.errors = null;
    next();
})


// Express-Validator Middleware
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Routes

// Opening index page
app.get('/', (req, res) => {
    // Using Mongojs put files from the database to render
    db.users.find(function (err, docs) {
        res.render('index', {
            title: 'This is Traversy Express Crash',
            heading: 'Using MongoJS to add and delete users in MongoDB',
            people: docs
        });
        console.log(docs);
    });
});

// Sending post request to add new user in DB
app.post('/users/add', (req, res) => {
    req.checkBody('first_name', 'First Name is required!').notEmpty();
    req.checkBody('age', 'Invalid age!').notEmpty().isInt();
    req.checkBody('email', 'Invalid email!').notEmpty().isEmail();

    let errors = req.validationErrors();
    if (errors) {
        // console.log(errors);
        db.users.find(function (err, docs) {
            res.render('index', {
                title: 'This is Traversy Express Crash',
                heading: 'Using MongoJS to add and delete users in MongoDB',
                people: docs,
                errors: errors
            });
        });
    } else {
        let newUser = {
            first_name: req.body.first_name,
            age: req.body.age,
            email: req.body.email
        };
        console.log('SUCCESS');
        db.users.insert(newUser, (err, result) => {
            if (err) {
                console.log(err)
            }
            res.redirect('/');
        });
    }
})

// Sending delete request to remove user in DB
app.delete('/users/delete/:id', (req, res) => {
    // console.log(req.params.id);
    db.users.remove({_id : ObjectId(req.params.id)}, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
        });
})

// Starting express server
app.listen(3000, () => {
    console.log(`Server started on port 3000`)
});
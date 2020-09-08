require('dotenv/config');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const csrf = require('csurf');
const flash = require('connect-flash');

const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = `mongodb://${process.env.MONGODB_HOST_NAME}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`;

const app = express();

const indexRoutes = require('./routes/index');
const errorController = require('./controllers/error.controllers');
const fileUploader = require('./middleware/fileUploader');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true, parameterLimit: 5000 }));

app.use(fileUploader);

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(compression());
app.use(flash());
app.use(morgan((process.env.NODE_ENV === 'production') ? 'combined' : 'dev'));

const PORT = Number(process.env.PORT) || 3000;

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(cookieParser());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 600000,
            expires: 1800000
        }
    })
);

const csrfProtection = csrf();

app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.errorMessage = req.flash('errorMessage');
    next();
});

app.use(indexRoutes);
app.get('/500', errorController.get500);
app.use(errorController.get404);
app.use((error, req, res, next) => {
    console.log(error);
    res.redirect('/500');
});

mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        mongoose.set('debug', true);
        app.listen(PORT, () => {
            console.log('SERVER RUNNING ON PORT', PORT);
        });
    })
    .catch(err => {
        console.log(err);
    });
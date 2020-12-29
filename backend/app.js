//TODO: Refactor authentication to use cookies instead of local storage
//TODO: Add pagination for the blog

//FIXME: Fix endpoints/variables from paintings to more relevant names

//Node Imports
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

//Own Imports
const poweruserRoutes = require('./routes/poweruser-routes');
const membersRoutes = require('./routes/member-routes');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const HttpError = require('./utils/httperror');
const auth = require('./middleware/auth');
const Poweruser = require('./models/poweruser');

const app = express();
//MIDDLEWARES

app.use(bodyParser.json());
app.use(helmet());

//The url is returned to the front-end and from there the request is made
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use(auth);

app.use('/api/poweruser/', poweruserRoutes);
app.use('/api/members/', membersRoutes);
app.use('/api/posts/', postRoutes);
app.use('/api/contactme', contactRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Failed to find route.', 404);
    next(error);
});

app.use((err, req, res, next) => {
    //delete the file if is in the request
    if (req.file) {
        fs.unlink(req.file.path, () => {
            //Failed to delete file
        });
    }
    if (res.headerSent) {
        return next(error);
    }

    res.status(err.errorCode || 500);
    res.json({
        message: err.message || 'An unknown error has occured.',
    });
});

//Server startup
//GENERATE A DEFAULT USER
mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        Poweruser.findOne({});
        app.listen(process.env.PORT || 5000);
    })
    .catch((e) => console.log(e));

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mogoURI);

const app = express();

// cookie-session - cuida da parte do cookie, extrai o cookie data
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias para expirar
        keys: [keys.cookieKey] // key para encriptografar 
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
//http://localhost:5000/
//https://git.heroku.com/boiling-temple-05045.git
//https://boiling-temple-05045.herokuapp.com/
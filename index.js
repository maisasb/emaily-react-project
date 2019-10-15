const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');


mongoose.connect(keys.mogoURI);

const app = express();

/*
 *Middlewares
 */
//Middleware que passa o payload das requisiçõe à diante
app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//Confguração para o express agir corretamente com relação as rotas do client
if (process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    //like out main.js file, or maiin.css file
    app.use(express.static('client/build'));
    //Express will serve up the index.html file
    //if it doesnt recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
//http://localhost:5000/
//https://git.heroku.com/boiling-temple-05045.git
//https://boiling-temple-05045.herokuapp.com/
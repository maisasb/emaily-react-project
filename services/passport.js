const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); 

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },  
    async (accessToken, refreshToken, profile, done) => {
        //Verifica se ja tem um usuário com id cadastrado
        const existingUser = await User.findOne({ googleId: profile.id });
           
        if (existingUser){
            //Temos um record with given profile ID
            return done(null, existingUser);
        }        
        //Create new user porque não tem profile com este ID
        //Cria o model instance e salva no DB
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);        
    })
);
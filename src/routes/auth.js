import passport from 'passport';
import express from 'express';
const route = express.Router();


route.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
  
route.get('/google/redirect', 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

export default route
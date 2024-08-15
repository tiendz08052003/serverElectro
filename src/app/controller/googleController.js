import passportGoogle from 'passport-google-oauth20';
import passport from 'passport';
import accountController from './accountController.js';
import dotenv from "dotenv";
dotenv.config();

const GoogleStrategy = passportGoogle.Strategy;

const doLoginWithGoogle = () => {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT
        },
            async (accessToken, refreshToken, profile, cb) => {
                const data = {
                    name: profile.displayName, 
                    email: profile.emails[0].value,
                    type: "Google"
                } 
                const user = await accountController.registerSocialMedia(data);
                console.log(user)
                return cb(null, user);
            }
        ))
    }


export default doLoginWithGoogle;


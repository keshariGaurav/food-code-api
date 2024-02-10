import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const configurePassport = (): void => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL:
                   'http://localhost:3100/api/v1/diner/auth/google/callback',
               
            },
            (accessToken, refreshToken, profile, done) => {
                const user = {
                    email: profile?.emails[0]?.value,
                    name: profile?.displayName,
                    verified:profile.emails[0].verified
                };
                return done(null, user);
            }
        )
    );
};


export { configurePassport };

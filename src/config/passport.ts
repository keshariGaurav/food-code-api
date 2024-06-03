import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import diner from '../models/diner.model';
import { IDiner } from '../models/diner.model';

const configurePassport = (): void => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL:
                    'http://localhost:3100/api/v1/diner/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    if (!profile._json.email) throw 'User does not have email';

                    let user = await diner.findOne({
                        email: profile._json.email,
                    });
                    if (user) {
                        done(null, user);
                    } else {
                        const newUser = {
                            name: profile._json.name,
                            email: profile._json.email,
                        };
                        user = await diner.create(newUser);
                        done(null, user);
                    }
                } catch (err: any) {
                    console.error(err);
                    done(err);
                }
            }
        )
    );
    passport.serializeUser(function (user: Express.User, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user: Express.User, done) {
        done(null, user);
    });
};

export { configurePassport };

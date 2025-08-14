import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './index';

export const configurePassport = () => {
  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Return the profile to be handled by the callback route
      return done(null, profile);
    } catch (error) {
      return done(error as Error);
    }
  }));

  // Serialize user for the session
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  // Deserialize user from the session
  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
};

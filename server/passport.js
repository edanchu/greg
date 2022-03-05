const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: 'greg',
      passReqToCallback: true,
    },
    (req, payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user, req.body);
        else return done(null, false);
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/api/user/auth/google/callback',
    },
    function (accessToken, refreshToken, email, cb) {
      const emailAddress = email.emails[0].value;
      User.findOrCreate(
        {
          googleId: email.id,
          username: emailAddress.split('@')[0],
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err, false);
        if (!user) return done(null, false);
        user.comparePassword(password, done);
      });
    }
  )
);

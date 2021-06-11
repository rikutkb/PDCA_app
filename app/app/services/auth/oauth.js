// const passport = require("passport");
// const googleConfig = {
//   clientID: process.env.GOOGLE_APP_ID,
//   clientSecret: process.env.GOOGLE_APP_SECRET,
//   callbackURL: `${process.env.SITE_HOST}/auth/google/callback`,
//   scope: ['email', 'profile'],
// }

// passport.use(
//   new passportGoogle.Strategy(
//     googleConfig,
//     (accessToken, refreshToken, profile, done) => {
//       return done(null, { accessToken })
//     },
//   ),
// )
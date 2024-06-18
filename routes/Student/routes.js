const express = require("express");
const passport = require("passport");
const {Student} = require("../../database/models");
const router = express.Router();
const StudentService = require("../../services/StudentService");
const studentService = new StudentService();

passport.serializeUser = studentService.serializeUser;

passport.deserializeUser = studentService.deserializeUser;

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const {
      id: password,
      name: { givenName, familyName },
      emails,
    } = profile;

    const email = emails?.[0]?.value;
    let user = await Student.findOne({ where: { email } });
    if (user) {
      return done(null, user);
    }

    const service = new StudentService(email, password, "user");
    const newStudent = await service.createStudent({
      firstName: givenName,
      lastName: familyName,
      provider: 'google'
    });

    return done(null, newStudent);
  } catch (err) {
    return done(err);
  }
}));

router.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  async (req, res, next) => {
    try {
      const service = new StudentService(req.user.email);
      const student = await service.findStudentByEmail(req.user.email);
      const token = await service.createToken(student);

      console.log('logged in: ', student.id);

      const link = `${process.env.FRONTEND_URL}/login?token=${token}`;
      return res.redirect(link);
    } catch (error) {
      console.log("Google OAuth error:", error);
      next(error);
    }
  },
);

module.exports = router;

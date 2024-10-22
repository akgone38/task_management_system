import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Google OAuth Login Route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google OAuth Callback Route
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_URL + '/login',
    session: false, // Disable session, we'll use JWT instead
  }),
  (req, res) => {
    // User object from Passport.js
    const googleUser = req.user;
    const googleId = googleUser.googleID;
    // Generate a JWT token with the user info
    const payload = {
      user: {
        id: googleUser._id,
        username: googleUser.username,
        email: googleUser.email,
        googleId: googleUser.googleID, // Include Google ID in token if needed
      },
    };

    // Sign the token with a secret key (stored in environment variables)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirect to the frontend with the JWT token in the query params
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);

// Logout Route (if needed for session-based logouts)
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

export default router;

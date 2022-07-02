const express = require('express');
const app = express();
const sessionMiddleware = require('./modules/session.middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const profileRouter = require('./routes/profiles.router');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 3000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

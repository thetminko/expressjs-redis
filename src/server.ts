import express from 'express';
import session from 'express-session';
import Redis from 'redis';
import connectRedis from 'connect-redis';

const redisStore = connectRedis(session);
const redisClient = Redis.createClient();

// Create a new express application instance
const app: express.Application = express();

app.use(session({
  secret: 'AbC$D',
  store: new redisStore({ host: 'localhost', client: redisClient, ttl: 100 }),
  cookie: {
    httpOnly: true,
    // secure: 'auto',
    sameSite: 'strict'
  },
  unset: 'destroy',
  saveUninitialized: false,
  resave: false
}));

app.get('/', async (req, res) => {
  const sessionUser = req.session.user ? JSON.parse(req.session.user).email : null;
  if (!sessionUser) {
    res.clearCookie('connect.sid');
    req.session = null;
  }
  res.json({ msg: `Hello World!, session: [${sessionUser}]` });
});

app.get('/add', (req, res) => {
  req.session.user = JSON.stringify({ userId: 1, name: 'test', email: 'something@gmail.com' });
  res.json({ msg: 'done' });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

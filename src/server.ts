import express from 'express';

// Create a new express application instance
const app: express.Application = express();

app.get('/', async (req, res) => {
  res.json({ msg: 'Hello World!' });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

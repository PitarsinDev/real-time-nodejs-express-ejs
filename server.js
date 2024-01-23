const express = require('express');
const app = express();
const forwarded = require('forwarded');

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  const ip = forwarded(req).ip;
  const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });

  res.locals.ip = ip;
  res.locals.currentTime = currentTime;

  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
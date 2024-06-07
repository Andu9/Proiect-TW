const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();
const port = 8888;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'authentificate.html'));
});

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

function readUsersFromFile() {
  if (fs.existsSync('data.json')) {
    return JSON.parse(fs.readFileSync('data.json'));
  }
  return [];
}

function verifica(username, password) {
  const users = readUsersFromFile();
  for (let i = 0; i < users.length; i += 1) {
    console.log(users[i].username, users[i].password, username, password, users[i].username == username, users[i].password == password);
    if (users[i].username == username && users[i].password == password) {
      return users[i];
    }
  }
  return false;
}

app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    if (!username || !password) {
      console.error('Username or password not provided');
      return res.status(400).send('Username and password are required');
    }

    const user = verifica(username, password);

    console.log(user);

    if (!user) {
      console.error('User not found');
      return res.status(401).send('Invalid username or password');
    }

    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error logging out:', err);
      return res.send('Error logging out');
    }
    res.redirect('/');
  });
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

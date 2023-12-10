const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const session = require('express-session');
const http = require('http');
const cors = require('cors');

const app = express();
const port = 5500;
app.use(cors());

// Connect to your PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'user_info',
  password: 'test',
  port: 5432,
});

  // Define middleware
  app.use(express.static('public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Enable sessions
  app.use(session({
    secret: 'aLongAndSecureSecretKey',
    resave: false,
    saveUninitialized: true,
  }));
  

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password, birthday, gender } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const result = await pool.query(
      'INSERT INTO users (firstname, lastname, email, password, birthday, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [firstname, lastname, email, hashedPassword, birthday, gender]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, result.rows[0].password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Set the user ID in the session
    req.session.userId = result.rows[0].id;

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Rental endpoint
app.post('/rent', async (req, res) => {
  try {
    const { user_id, equipment_name, location, phone_number, pick_up_date, return_date } = req.body;

    // Insert rental information into the database
    const result = await pool.query(
      'INSERT INTO rentals (user_id, equipment_name, location, phone_number, pick_up_date, return_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, equipment_name, location, phone_number, pick_up_date, return_date]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error during rental:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Retrieve all rentals for a specific user
app.get('/rentals/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Retrieve all rentals for the specified user
    const result = await pool.query('SELECT * FROM rentals WHERE user_id = $1', [userId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving rentals:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Dashboard route (a protected route)
app.get('/main', (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    // Render the dashboard
    res.send('Welcome to the dashboard! <a href="/logout">Logout</a>');
  } catch (error) {
    console.error('Error rendering dashboard:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/login');
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login page route
app.get('/login', (req, res) => {
  res.send(`
    <form method="post" action="/login">
      <label for="email">Email:</label>
      <input type="text" id="email" name="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  `);
});

try {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (error) {
  console.error('Error connecting to PostgreSQL:', error);
}




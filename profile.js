const { Pool } = require('pg');

// Replace these with your actual database connection details
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

async function createSocialMediaProfile(name, username, bio) {
  const client = await pool.connect();

  try {
    // Insert user data into the 'users' table (replace 'users' with your actual table name)
    const result = await client.query(
      'INSERT INTO users (name, username, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, username, bio]
    );

    // Log the inserted user details
    const insertedUser = result.rows[0];
    console.log('User Profile Created:');
    console.log('ID:', insertedUser.id);
    console.log('Name:', insertedUser.name);
    console.log('Username:', insertedUser.username);
    console.log('Bio:', insertedUser.bio);
  } catch (error) {
    console.error('Error creating user profile:', error.message);
  } finally {
    client.release();
  }
};

createSocialMediaProfile(userProfileData.name, userProfileData.username, userProfileData.bio);

async function updateSocialMediaProfile(userId, newBio) {
  const client = await pool.connect();

  try {
    // Update user data in the 'users' table (replace 'users' with your actual table name)
    const result = await client.query(
      'UPDATE users SET bio = $1 WHERE id = $2 RETURNING *',
      [newBio, userId]
    );

    // Log the updated user details
    const updatedUser = result.rows[0];
    console.log('User Profile Updated:');
    console.log('ID:', updatedUser.id);
    console.log('Name:', updatedUser.name);
    console.log('Username:', updatedUser.username);
    console.log('New Bio:', updatedUser.bio);
  } catch (error) {
    console.error('Error updating user profile:', error.message);
  } finally {
    client.release();
  }
}

// Example usage to update the bio of an existing user (replace 'userId' with the actual user ID):
const userIdToUpdate = 1; // Replace with the actual user ID to update
const newBio = 'Updated bio for the user.';
updateSocialMediaProfile(userIdToUpdate, newBio);

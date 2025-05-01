import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const username = ''; // Add your admin username here
  const password = ''; // Add your admin password here

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    await connection.execute(
      'INSERT INTO admins(username, password_hash) VALUES (?, ?)',
      [username, passwordHash]
    );
    console.log('Admin account created successfully!');
  } catch (err) {
    console.error('Error creating admin account:', err);
  } finally {
    await connection.end();
  }
}

createAdmin();
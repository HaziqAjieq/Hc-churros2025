
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise.js');
require('dotenv').config();

async function createAdmin() {
  const connection = await mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
  });

  const username = 'Admin-Churros1';
  const password ='WAN-HC123@';

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password,salt);

  try{
    await connection.execute(
      'INSERT INTO admins(username,password_hash) VALUES (? , ?)',
      [username,passwordHash]
    );
    console.log('Admin acc created!');
  } catch(err){
    console.error('Error creating admin acc:' , err);
  }finally {
    await connection.end();
  }
}

createAdmin();
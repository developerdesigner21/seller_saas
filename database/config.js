const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'seller_saas',
  password: 'postgres',
  port: 5432, // Default PostgreSQL port
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    return;
  }
  console.log('Connected to PostgreSQL!');
  release(); // Release the client back to the pool
});

module.exports = pool

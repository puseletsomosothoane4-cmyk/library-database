
import 'dotenv/config';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Create demo administrator
const [found] = await db.execute(
  'SELECT id FROM users WHERE membership_id = ?',
  ['ADMIN001']
);

if (!found.length) {
  const hash = await bcrypt.hash('admin123', 10);

  await db.execute(
    'INSERT INTO users (name, membership_id, role, password_hash) VALUES (?, ?, ?, ?)',
    ['Library Administrator', 'ADMIN001', 'ADMIN', hash]
  );
}

// Add sample books if the books table is empty
const [books] = await db.execute('SELECT id FROM books');

if (!books.length) {
  const sampleBooks = [
    ['Things Fall Apart', 'Chinua Achebe', 'Fiction', 'ISBN001', 5],
    ['The River Between', 'Ngugi wa Thiong’o', 'Fiction', 'ISBN002', 4],
    ['Purple Hibiscus', 'Chimamanda Ngozi Adichie', 'Fiction', 'ISBN003', 3],
    ['Introduction to Algorithms', 'Thomas H. Cormen', 'Computing', 'ISBN004', 2],
    ['Clean Code', 'Robert C. Martin', 'Computing', 'ISBN005', 1],
    ['Database System Concepts', 'Abraham Silberschatz', 'Computing', 'ISBN006', 4]
  ];

  for (const book of sampleBooks) {
    await db.execute(
      'INSERT INTO books (title, author, genre, isbn, quantity) VALUES (?, ?, ?, ?, ?)',
      book
    );
  }

  console.log('Six sample books added successfully!');
} else {
  console.log('Books already exist. No sample books added.');
}

console.log('Demo admin ready: ADMIN001 / admin123');

await db.end();

const pool = require('./backend/db');

(async () => {
  try {
    console.log('Searching for similar emails...');
    const q = "SELECT id,email,role FROM users WHERE email ILIKE $1 OR email ILIKE $2";
    const before = await pool.query(q, ['%shrutipawar%', '%shrutivpawar%']);
    console.log('Found rows BEFORE update:', before.rows);
    if (before.rows.length === 0) { console.log('No matching rows to update.'); return; }

    const target = before.rows.find(r => r.email.toLowerCase().includes('shrutipawar'));
    if (!target) { console.log('No target row found for update.'); return; }

    const newEmail = 'shrutivpawar2005@gmail.com';
    console.log('Updating id', target.id, 'email', target.email, '->', newEmail);
    await pool.query('UPDATE users SET email=$1 WHERE id=$2', [newEmail, target.id]);

    const after = await pool.query('SELECT id,email,role FROM users WHERE id=$1', [target.id]);
    console.log('Row AFTER update:', after.rows);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await pool.end();
  }
})();

const bcrypt = require('bcrypt');

const users = [
  {
    id: 1,
    name: 'Dr. Anwar',
    email: 'dosen1@utbj.ac.id',
    nidn: '19876543',
    password_hash: bcrypt.hashSync('Dosen@123', 10),
    role: 'dosen',
    is_active: true
  },
  {
    id: 2,
    name: 'Ibu Rina',
    email: 'reviewer1@utbj.ac.id',
    nidn: null,
    password_hash: bcrypt.hashSync('Reviewer@123', 10),
    role: 'reviewer',
    is_active: true
  },
  {
    id: 3,
    name: 'Admin UTBJ',
    email: 'admin@utbj.ac.id',
    nidn: null,
    password_hash: bcrypt.hashSync('Admin@123', 10),
    role: 'admin',
    is_active: true
  },
  {
    id: 3,
    name: 'Admin UTBJ',
    email: 'admin@gmail.com',
    nidn: null,
    password_hash: bcrypt.hashSync('1234567890', 10),
    role: 'admin',
    is_active: true
  }
];

function findByIdentifier(identifier) {
  if (!identifier) return null;
  const idLower = String(identifier).toLowerCase();
  return users.find(u => (u.email && u.email.toLowerCase() === idLower) || (u.nidn && u.nidn === identifier));
}

function verifyPassword(user, plainPassword) {
  if (!user) return false;
  return bcrypt.compareSync(plainPassword, user.password_hash);
}

function createUser({ name, email, nidn, password, role }) {
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const hash = bcrypt.hashSync(password, 10);
  const newUser = { id, name, email, nidn: nidn || null, password_hash: hash, role: role || 'dosen', is_active: true };
  users.push(newUser);
  return newUser;
}

module.exports = { users, findByIdentifier, verifyPassword, createUser };

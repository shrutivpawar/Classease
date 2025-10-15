// Note: API route definitions that reference `app` must come after app is initialized.

const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// API: Student monthly progress (attendance and average grade per month)
app.get('/api/student/progress', async (req, res) => {
  // TODO: Use real student ID/email from auth/session
  // For now, return mock data for 12 months
  // Replace with DB query as needed
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Example: attendance (%) and avgGrade (out of 10) for each month
  const attendance = [92, 90, 88, 95, 97, 93, 91, 94, 96, 98, 99, 97];
  const avgGrade = [8.2, 8.4, 8.1, 8.7, 8.9, 8.5, 8.6, 8.8, 9.0, 9.1, 9.2, 9.0];
  res.json({ months, attendance, avgGrade });
});

// --- API stubs for teacher dashboard ---
app.get('/api/teacher/timetable', (req, res) => {
  // Return an empty array or mock data
  res.json([]);
});

app.get('/api/teacher/stats', (req, res) => {
  // Return mock stats
  res.json({ classesToday: 0, totalStudents: 0, weeklyClasses: 0 });
});

app.get('/api/classrooms', (req, res) => {
  // Return an empty array or mock data
  res.json([]);
});

app.get('/api/teacher/classes', (req, res) => {
  // Return an empty array or mock data
  res.json([]);
});

// Serve frontend static files (adjust path to your frontend folder)
app.use(express.static(path.join(__dirname, "../frontend")));

// Login API: authenticate user from PostgreSQL
app.post("/api/auth/login", async (req, res) => {
  let { email, password, role } = req.body;

  // Normalize inputs to avoid simple mismatches (trim and lowercase email)
  email = (email || '').toString().trim().toLowerCase();
  password = (password || '').toString();

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password and role are required" });
  }

  // Map frontend 'administrator' to DB 'administration'
  let dbRole = role;
  if (role === 'administrator') dbRole = 'administration';

  try {
  // Log attempt (don't log password)
  console.log("Login attempt:", { email, dbRole });

  // First fetch user by email only (case-insensitive) to help diagnose mismatches
  const userQuery = 'SELECT email, role, password FROM users WHERE LOWER(email) = $1';
  const userRes = await pool.query(userQuery, [email.toLowerCase()]);
    console.log('User lookup result:', userRes.rows);

    if (userRes.rows.length === 0) {
      console.log('No user found with that email.');
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    const user = userRes.rows[0];

    // Check password
    if (user.password !== password) {
      console.log('Password mismatch for', email);
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    // Check role (dbRole already mapped)
    if (user.role !== dbRole) {
      console.log(`Role mismatch: expected ${dbRole}, got ${user.role}`);
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    // Always return 'administrator' to frontend for consistency
    const frontendRole = (user.role === 'administration') ? 'administrator' : user.role;

    res.json({
      user: { email: user.email, role: frontendRole },
      token: "dummy-jwt-token" // Replace with real JWT token if you implement auth tokens
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Serve index1.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index1.html"));
});

// Serve other pages for redirection
app.get("/student.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/student.html"));
});
app.get("/teacher.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/teacher.html"));
});
app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admin.html"));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Log which database we're connected to for debugging
  pool.query('SELECT current_database()').then(r => {
    console.log('Connected database:', r.rows[0].current_database);
  }).catch(err => console.warn('Unable to determine current_database:', err));
});

ClassEase – Smart Classroom & Timetable Management App

Key Features:

📅 Timetable Generator & Editor – Auto-creates optimized schedules for classes and labs.

🎯 Student Progress & Goal Tracker – Monitors individual growth and performance.

🧠 Learning Style Identifier – Personalizes learning through mentor allocation.

🧾 Smart Attendance & Risk Assessment – Detects irregularities and identifies at-risk students.

📚 Digital Library & Peer Tutoring – Easy access to study resources and mentorship.

🏆 Events, Skills & Achievements Dashboard – Centralized student activity management.

TechStack:
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: PostgreSQL

Summary:

Simple Node + Express backend with a small frontend for admin/student/teacher pages.

Structure:
- backend/: Express server and db connection
- frontend/: static html files

To run locally:
1. cd backend
2. npm install
3. node server.js

Notes:
- Database config is in `backend/db.js` (Postgres). Adjust credentials before running.
- This project contains a sample change script `fix_update_email.js` used during debugging.

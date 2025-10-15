Project SIH1

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

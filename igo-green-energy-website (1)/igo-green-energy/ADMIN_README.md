# Green Energy – Admin & Database

## Run locally
1. `npm install`   (new packages: express, better-sqlite3, nodemailer, concurrently)
2. `npm run dev:all`  → website on http://localhost:5174, API on http://localhost:8787
   (or `npm start` → builds the site and serves everything from http://localhost:8787)
3. Open `/admin`. On the very first run the admin login is printed in the terminal and saved in
   `server/data/first-admin-login.txt` (or set ADMIN_EMAIL / ADMIN_PASSWORD in `.env`). Change the password from the account menu.

## What is stored in the database (SQLite file `server/data/green-energy.db`)
- `enquiries` – Smart Quote, Contact form, Callback requests, Newsletter sign-ups (shown in Admin → Enquiries)
- `content_docs` – every edit made in Page Content, Projects, Blogs, FAQs, Leadership, Settings…
- `admins`, `uploads`, `activity`

Uploaded images live in `server/uploads`. Back up both folders.

## Production
Run `npm run build` then `node server/index.js` behind HTTPS (set COOKIE_SECURE=1, SESSION_SECRET, SMTP_* for e-mail alerts).
The data layer is plain SQL, so it can be moved to MySQL/PostgreSQL later by replacing `server/db.js`.

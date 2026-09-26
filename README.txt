HireTrack Version 1.1
======================

Frontend-only hiring/job blog with an integrated Admin Dashboard.

FILES
-----
index.html
style.css
script.js

PUBLIC WEBSITE
--------------
- Responsive homepage
- Search and category filter
- Published job cards
- Job details popup
- Apply Now links

ADMIN DASHBOARD
---------------
Click "Admin" in the top navigation.

Demo login:
Username: admin
Password: admin123

Admin features:
- Dashboard statistics
- View all job blogs
- Search/filter posts
- Add job blog
- Save draft
- Publish
- Edit
- Publish/unpublish
- Delete
- Reset demo data

STORAGE
-------
Posts are stored in browser localStorage under:
hiretrack_jobs_v11

The login session uses sessionStorage.

IMPORTANT SECURITY NOTE
-----------------------
This is a frontend demo. The username/password are visible in JavaScript
and are NOT secure. Do not deploy this authentication as a real production
admin system.

VERSION 2
---------
Connect the frontend to:
- Java Spring Boot REST API
- MySQL
- BCrypt/password hashing
- JWT/session authentication
- Real admin roles
- Server-side validation
- Image/file storage
- SEO fields
- Production deployment

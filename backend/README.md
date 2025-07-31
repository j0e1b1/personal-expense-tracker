# Backend Setup

1. Install dependencies:
   ```
   npm install express express-session express-mysql-session mysql2 bcrypt cors
   ```

2. Update `db.js` with your MySQL credentials.

3. Create a `users` table in your MySQL database:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL
   );
   ```

4. Start the server:
   ```
   node server.js
   ```

5. The backend runs on port 5000 by default.

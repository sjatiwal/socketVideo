createUserTable = `
CREATE TABLE IF NOT EXISTS users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
phoneNo VARCHAR(10) NOT NULL,
userrole VARCHAR(20) DEFAULT 'user' );`;

module.exports = { createUserTable };

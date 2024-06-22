var mysql = require("mysql2");
const { createUserTable } = require("../models/tableSchemma");

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Satish@01#96",
  database: "videosocket",
});

pool.getConnection(() => {
  //   if (err) throw err;
  console.log("Connected to MySQL!");

  const createDatabaseSQL = "CREATE DATABASE IF NOT EXISTS videosocket";

  pool.query(createDatabaseSQL, (dbError) => {
    if (dbError) {
      console.error("Error creating database: " + dbError);
    } else {
      console.log("Database created successfully");

      // Select the newly created database
      pool.query("USE videosocket", (useDbError) => {
        if (useDbError) {
          console.error("Error selecting the database: " + useDbError);
        } else {
          console.log("Database selected successfully");

          // SQL query to create the "users" table
          pool.query(createUserTable, (tableError) => {
            if (tableError) {
              console.error("Error creating table: " + tableError);
            } else {
              console.log("User Table created successfully");
            }
          });
        }
      });
    }
  });
});
module.exports = pool;

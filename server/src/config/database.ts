import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "localpassword15",
	database: "personsdatabase",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

async function createTablesIfNotExists() {
	const createGroupsTableQuery = `
    CREATE TABLE IF NOT EXISTS  \`groups\` (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      add_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      group_id INT
    );
  `;

	const createPersonsTableQuery = `
    CREATE TABLE IF NOT EXISTS persons (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      job_title VARCHAR(255),
      add_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      group_id INT,
      FOREIGN KEY (group_id) REFERENCES \`groups\`(id)
    );
  `;

	try {
		await pool.execute(createGroupsTableQuery);
		console.log("Table `groups` created or already exists.");

		await pool.execute(createPersonsTableQuery);
		console.log("Table `persons` created or already exists.");
	} catch (err) {
		console.error("Error creating tables:", err);
	}
}

createTablesIfNotExists();

export default pool;

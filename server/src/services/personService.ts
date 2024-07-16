import { Person } from "../models/Person";
import pool from "../config/database";
import { ResultSetHeader } from "mysql2";

class PersonService {
	async getAllPersons(): Promise<any> {
		let [results] = await pool.execute("SELECT * FROM persons");
		return results;
	}

	async getPersonById(id: number): Promise<Person | undefined> {
		const [rows] = await pool.execute(
			"SELECT * FROM persons WHERE id = ?",
			[id],
		);
		const persons = rows as Person[];
		return persons.length > 0 ? persons[0] : null;
	}

	async createPerson(person: Person): Promise<Person> {
		let [result] = await pool.execute(
			"INSERT INTO persons (first_name, last_name, job_title, add_date, update_date, group_id) VALUES (?, ?, ?, ?, ?, ?)",
			[
				person.first_name,
				person.last_name,
				person.job_title,
				person.add_date,
				person.update_date,
				person.group_id,
			],
		);
		return person;
	}
	async updatePerson(person: Person): Promise<Person> {
		let query = "UPDATE persons SET ";
		const values = [];
		const fieldsToUpdate = [];

		if (person.first_name !== null && person.first_name !== undefined) {
			fieldsToUpdate.push("first_name = ?");
			values.push(person.first_name);
		}
		if (person.last_name !== null && person.last_name !== undefined) {
			fieldsToUpdate.push("last_name = ?");
			values.push(person.last_name);
		}
		if (person.job_title !== null && person.job_title !== undefined) {
			fieldsToUpdate.push("job_title = ?");
			values.push(person.job_title);
		}
		if (person.add_date !== null && person.add_date !== undefined) {
			fieldsToUpdate.push("add_date = ?");
			values.push(person.add_date);
		}
		if (person.update_date !== null && person.update_date !== undefined) {
			fieldsToUpdate.push("update_date = ?");
			values.push(person.update_date);
		}
		if (person.group_id !== null && person.group_id !== undefined) {
			fieldsToUpdate.push("group_id = ?");
			values.push(person.group_id);
		}

		if (fieldsToUpdate.length === 0) {
			return person;
		}

		query += fieldsToUpdate.join(", ");

		query += " WHERE id = ?";
		values.push(person.id);

		const [result] = await pool.query<ResultSetHeader>(query, values);
		if (result.affectedRows === 0) {
			throw new Error(`Person with id ${person.id} not found`);
		}
		return person;
	}

	async deletePerson(id: number): Promise<any> {
		let query = `DELETE FROM persons WHERE id = ?`;
		const [result] = await pool.query<ResultSetHeader>(query, id);

		if (result.affectedRows === 0) {
			throw new Error(`Person with id ${id} not found`);
		}
	}
}

export default new PersonService();

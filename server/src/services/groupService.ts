import { Group } from "../models/Group";
import pool from "../config/database";
import { ResultSetHeader } from "mysql2";

class GroupService {
	async getAllGroups(): Promise<any> {
		let [results] = await pool.execute("SELECT * FROM `groups`");
		return results;
	}

	async getGroupById(id: number): Promise<Group | undefined> {
		const [rows] = await pool.execute(
			"SELECT * FROM `groups` WHERE id = ?",
			[id],
		);
		const groups = rows as Group[];
		return groups.find((group) => group.id === id);
	}

	async getGroupsByGroupId(id: number): Promise<Group[] | undefined> {
		const [rows] = await pool.execute(
			"SELECT * FROM `groups` WHERE group_id = ?",
			[id],
		);
		const groups = rows as Group[];
		return groups;
	}

	async getLastGroup(
		id: number,
		orderBy: string,
	): Promise<Group[] | undefined> {
		const query =
			"SELECT * FROM `groups` WHERE group_id = ? ORDER BY " +
			pool.escapeId(orderBy) +
			"DESC LIMIT 1";
		const [rows] = await pool.execute(query, [id]);

		const groups = rows as Group[];

		return groups;
	}

	async getPersonsLeftJoin(id: number): Promise<Group[] | undefined> {
		const [rows] = await pool.execute(
			"SELECT p.*, g.name as group_name, g.add_date as group_add_date, g.update_date as group_update_date FROM persons p LEFT JOIN `groups` g ON p.group_id = g.id WHERE p.group_id = ?",
			[id],
		);
		const groupsData = rows as Group[];
		return groupsData;
	}

	async createGroup(group: Group): Promise<Group> {
		let [result] = await pool.execute(
			"INSERT INTO `groups` (name, add_date, update_date, group_id) VALUES (?, ?, ?, ?)",
			[group.name, group.add_date, group.update_date, group.group_id],
		);
		return group;
	}

	async updateGroup(group: Group): Promise<Group> {
		let query = "UPDATE `groups` SET ";
		const values = [];
		const fieldsToUpdate = [];

		if (group.name !== null && group.name !== undefined) {
			fieldsToUpdate.push("name = ?");
			values.push(group.name);
		}
		if (group.add_date !== null && group.add_date !== undefined) {
			fieldsToUpdate.push("add_date = ?");
			values.push(group.add_date);
		}
		if (group.update_date !== null && group.update_date !== undefined) {
			fieldsToUpdate.push("update_date = ?");
			values.push(group.update_date);
		}
		if (group.group_id !== null && group.group_id !== undefined) {
			fieldsToUpdate.push("group_id = ?");
			values.push(group.group_id);
		}
		if (fieldsToUpdate.length === 0) {
			return group;
		}
		query += fieldsToUpdate.join(", ");

		query += " WHERE id = ?";
		values.push(group.id);

		const [result] = await pool.query<ResultSetHeader>(query, values);
		if (result.affectedRows === 0) {
			throw new Error(`Person with id ${group.id} not found`);
		}
		return group;
	}

	async deleteGroup(id: number): Promise<any> {
		let query = `DELETE FROM groups WHERE id = ?`;
		const [result] = await pool.query<ResultSetHeader>(query, id);

		if (result.affectedRows === 0) {
			throw new Error(`Person with id ${id} not found`);
		}
	}
}

export default new GroupService();

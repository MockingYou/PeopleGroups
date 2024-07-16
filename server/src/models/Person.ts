import IPerson from "../interfaces/IPerson";

export class Person implements IPerson {
	id: number;
	first_name: string;
	last_name: string;
	job_title: string;
	add_date: string;
	update_date: string;
	group_id: number;

	constructor(
		id: number,
		first_name: string,
		last_name: string,
		job_title: string,
		add_date: string,
		update_date: string,
		group_id: number = 0,
	) {
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.job_title = job_title;
		this.add_date = add_date;
		this.update_date = update_date;
		this.group_id = group_id;
	}
}

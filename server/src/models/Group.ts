import IGroup from "../interfaces/IGroup";
import IPerson from "../interfaces/IPerson";

export class Group implements IGroup {
	id: number;
	name: string;
	add_date: string;
	update_date: string;
	group_id: number;

	constructor(
		id: number,
		name: string,
		add_date: string,
		update_date: string,
		group_id: number = 0,
	) {
		this.id = id;
		this.name = name;
		this.group_id = group_id;
		this.add_date = add_date;
		this.update_date = update_date;
	}
}

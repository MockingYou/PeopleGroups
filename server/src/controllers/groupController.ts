import { NextFunction, Request, Response } from "express";
import GroupService from "../services/groupService";
import { Group } from "../models/Group";

const getAllGroups = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const groups = await GroupService.getAllGroups();
		res.status(200).json({
			status: "success",
			groups,
		});
	} catch (error) {
		next(error);
	}
};

const getGroupById = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const group = await GroupService.getGroupById(Number(id));
	if (group) {
		res.status(200).json({
			status: "success",
			group,
		});
	} else {
		res.status(404).json({ message: "Group not found" });
	}
};

const getGroupsByGroupId = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const { id } = req.params;
	const group = await GroupService.getGroupsByGroupId(Number(id));
	if (group) {
		res.status(200).json({
			status: "success",
			group,
		});
	} else {
		res.status(404).json({ message: "Group not found" });
	}
};

const getLastGroup = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { orderBy } = req.query;
	const group = await GroupService.getLastGroup(
		Number(id),
		orderBy as string,
	);
	if (group) {
		res.status(200).json({
			status: "success",
			group,
		});
	} else {
		res.status(404).json({ message: "Group not found" });
	}
};

const getPersonsLeftJoin = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const { id } = req.params;
	const group = await GroupService.getPersonsLeftJoin(Number(id));
	if (group) {
		res.status(200).json({
			status: "success",
			group,
		});
	} else {
		res.status(404).json({ message: "Group not found" });
	}
};

const createGroup = (req: Request, res: Response): void => {
	const { name, group_id } = req.body;
	const add_date = new Date().toISOString().slice(0, 19).replace("T", " ");
	const group = new Group(null, name, add_date, add_date, group_id);
	GroupService.createGroup(group);
	if (group) {
		res.status(201).json({
			status: "success",
			group,
		});
	} else {
		res.status(404).json({ message: "Group not found" });
	}
};

const updateGroup = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { name, group_id } = req.body;
	const update_date = new Date().toISOString().slice(0, 19).replace("T", " ");

	const group = new Group(Number(id), name, null, update_date, group_id);
	await GroupService.updateGroup(group);
	if (group) {
		res.status(201).json({
			status: "success",
			group,
		});
	} else {
		res.status(404).json({ message: "Group not found" });
	}
};
const deleteGroup = (req: Request, res: Response): void => {
	const { id } = req.params;
	GroupService.deleteGroup(Number(id));
	res.status(201).json(id);
};
export {
	getAllGroups,
	getGroupById,
	createGroup,
	updateGroup,
	deleteGroup,
	getPersonsLeftJoin,
	getGroupsByGroupId,
	getLastGroup,
};

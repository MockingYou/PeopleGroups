import { NextFunction, Request, Response } from "express";
import PersonService from "../services/personService";
import { Person } from "../models/Person";

const getAllPersons = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const persons = await PersonService.getAllPersons();
		res.status(200).json({
			status: "success",
			persons,
		});
	} catch (error) {
		next(error);
	}
};

const getPersonById = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const person = await PersonService.getPersonById(Number(id));
	if (person) {
		res.status(200).json({
			status: "success",
			person,
		});
	} else {
		res.status(404).json({ message: "Person not found" });
	}
};

const createPerson = async (req: Request, res: Response): Promise<void> => {
	const { first_name, last_name, job_title, group_id } = req.body;
	const add_date = new Date().toISOString().slice(0, 19).replace("T", " ");
	const person = new Person(
		null,
		first_name,
		last_name,
		job_title,
		add_date,
		add_date,
		group_id,
	);
	PersonService.createPerson(person);
	const persons = await PersonService.getAllPersons();
	if (persons) {
		res.status(201).json({
			status: "success",
			persons,
		});
	} else {
		res.status(404).json({ message: "Person not found" });
	}
};

const updatePerson = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { first_name, last_name, job_title, group_id } = req.body;
	const update_date = new Date().toISOString().slice(0, 19).replace("T", " ");

	const person = new Person(
		Number(id),
		first_name,
		last_name,
		job_title,
		null,
		update_date,
		group_id,
	);
	const personResponse = await PersonService.updatePerson(person);
	if (personResponse) {
		res.status(201).json({
			status: "success",
			person: personResponse,
		});
	} else {
		res.status(404).json({ message: "Person not found" });
	}
};

const deletePerson = (req: Request, res: Response): void => {
	const { id } = req.params;
	PersonService.deletePerson(Number(id));
	res.status(201).json(id);
};

export {
	getAllPersons,
	getPersonById,
	createPerson,
	updatePerson,
	deletePerson,
};

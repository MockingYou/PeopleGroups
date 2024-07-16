import { Router } from "express";
import {
	getAllPersons,
	getPersonById,
	createPerson,
	updatePerson,
	deletePerson,
} from "../controllers/personController";

const router = Router();

router.route("/").get(getAllPersons).post(createPerson);

router
	.route("/:id")
	.get(getPersonById)
	.patch(updatePerson)
	.delete(deletePerson);

export default router;

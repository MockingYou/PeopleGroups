import { Router } from "express";
import {
	getAllGroups,
	getGroupById,
	createGroup,
	updateGroup,
	deleteGroup,
	getPersonsLeftJoin,
	getGroupsByGroupId,
	getLastGroup,
} from "../controllers/groupController";

const router = Router();

router.route("/").get(getAllGroups).post(createGroup);

router.route("/:id").get(getGroupById).patch(updateGroup).delete(deleteGroup);

router.route("/group/:id").get(getGroupsByGroupId);

router.route("/last/:id").get(getLastGroup);

router.route("/join/:id").get(getPersonsLeftJoin);

export default router;

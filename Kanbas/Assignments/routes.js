import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
	app.get("/api/courses/:cid/assignments", (req, res) => {
		const { cid } = req.params;
		const assignments = dao.findAssignmentsByCourse(cid);
		res.json(assignments);
	});
	app.post("/api/courses/:cid/assignments", (req, res) => {
		const { cid } = req.params;
		const newAssignment = dao.createAssignment({
			...req.body,
			course: cid,
		});
		res.json(newAssignment);
	});
	app.delete("/api/assignments/:aid", (req, res) => {
		const { aid } = req.params;
		dao.deleteAssignment(aid);
		res.sendStatus(200);
	});
	app.put("/api/assignments/:aid", (req, res) => {
		const { aid } = req.params;
		const updatedAssignment = dao.updateAssignment(aid, req.body);
		if (updatedAssignment) {
			res.sendStatus(204);
		} else {
			res.sendStatus(404);
		}
	});
}

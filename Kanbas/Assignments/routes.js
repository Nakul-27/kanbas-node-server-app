// import Database from "../Database/index.js";
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

	app.delete("/api/assignments/:aid", async (req, res) => {
		const { aid } = req.params;
		const status = await dao.deleteAssignment(aid);
		res.sendStatus(status);
	});

	app.put("/api/assignments/:aid", async (req, res) => {
		const { aid } = req.params;
		const status = await dao.updateAssignment(aid, req.body);
		res.send(status);
		// if (updatedAssignment) {
		// 	res.sendStatus(204);
		// } else {
		// 	res.sendStatus(404);
		// }
	});
}

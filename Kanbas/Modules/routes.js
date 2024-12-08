import Database from "../Database/index.js";
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function ModuleRoutes(app) {
	app.get("/api/courses/:cid/modules", (req, res) => {
		const { cid } = req.params;
		const modules = Database.modules.filter((m) => m.course === cid);
		res.json(modules);
	})
	app.post("/api/courses/:courseId/modules", (req, res) => {
		const { courseId } = req.params;
		const module = {
			...req.body,
			course: courseId,
		};
		const newModule = modulesDao.createModule(module);
		res.send(newModule);
	});
	app.delete("/api/modules/:moduleId", async (req, res) => {
		const { moduleId } = req.params;
		const status = await modulesDao.deleteModule(moduleId);
		res.send(status);
	});
	app.put("/api/modules/:mid", (req, res) => {
		const { mid } = req.params;
		const moduleIndex = Database.modules.findIndex(
			(m) => m._id === mid);
		Database.modules[moduleIndex] = {
			...Database.modules[moduleIndex],
			...req.body
		};
		res.sendStatus(204);
	});
}



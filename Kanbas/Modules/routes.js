import Database from "../Database/index.js";
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function ModuleRoutes(app) {
	app.get("/api/courses/:cid/modules", async (req, res) => {
		const { cid } = req.params;
		const modules = Database.modules.filter((m) => m.course === cid);
		res.json(modules);
	});

	app.post("/api/courses/:courseId/modules", async (req, res) => {
		const { courseId } = req.params;
		const module = {
			...req.body,
			course: courseId,
		};
		const newModule = await modulesDao.createModule(module);
		res.send(newModule);
	});

	app.delete("/api/modules/:moduleId", async (req, res) => {
		const { moduleId } = req.params;
		const status = await modulesDao.deleteModule(moduleId);
		res.send(status);
	});

	app.put("/api/modules/:moduleId", async (req, res) => {
		const { moduleId } = req.params;
		const moduleUpdates = req.body;
		const status = await modulesDao.updateModule(moduleId, moduleUpdates);
		res.send(status);
	});
}



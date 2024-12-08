import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
	app.get("/api/courses", (req, res) => {
		const courses = dao.findAllCourses();
		res.send(courses);
	});
	app.post("/api/courses", (req, res) => {
		const course = {
			...req.body,
			_id: new Date().getTime().toString()
		};
		Database.courses.push(course);
		res.send(course);
	})
	app.put("/api/courses/:courseId", (req, res) => {
		const { courseId } = req.params;
		const courseUpdates = req.body;
		const status = dao.updateCourse(courseId, courseUpdates);
		res.send(status);
	});
	app.put("/api/courses/:id", (req, res) => {
		const { id } = req.params;
		const course = req.body;
		Database.courses = Database.courses.map((c) =>
			c._id === id ? { ...c, ...course } : c
		);
		res.sendStatus(204);
	});
}

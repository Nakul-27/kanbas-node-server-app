import Database from "../Database/index.js";
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as assignmenetsDao from "../Assignments/dao.js";

export default function CourseRoutes(app) {


	const findUsersForCourse = async (req, res) => {
		const { cid } = req.params;
		const users = await enrollmentsDao.findUsersForCourse(cid);
		res.json(users);
	};

	app.get("/api/courses/:cid/users", findUsersForCourse);

	app.get("/api/courses", async (req, res) => {
		const courses = await dao.findAllCourses();
		res.send(courses);
	});

	app.get("/api/courses/:courseId/assignments", async (req, res) => {
		const { courseId } = req.params;
		const assignments = await assignmenetsDao.findAssignmentsByCourse(courseId);
		res.json(assignments);
	})

	app.post("/api/courses", async (req, res) => {
		const course = await dao.createCourse(req.body);
		res.json(course);
	});

	app.put("/api/courses/:courseId", async (req, res) => {
		const { courseId } = req.params;
		const courseUpdates = req.body;
		const status = await dao.updateCourse(courseId, courseUpdates);
		res.send(status);
	});

	app.put("/api/courses/:id", async (req, res) => {
		const { id } = req.params;
		const course = req.body;
		Database.courses = Database.courses.map((c) =>
			c._id === id ? { ...c, ...course } : c
		);
		res.sendStatus(204);
	});

	app.delete("/api/courses/:courseId", async (req, res) => {
		const { courseId } = req.params;
		const status = await dao.deleteCourse(courseId);
		res.send(status);
	});
}

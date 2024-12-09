import * as peopleDao from "./dao.js";

export default function PeopleRoutes(app) {
	app.get("/api/people/:courseId", async (req, res) => {
		const { courseId } = req.params;
		const people = await peopleDao.findUsersForCourse(courseId);
		res.send(people);
	})
}

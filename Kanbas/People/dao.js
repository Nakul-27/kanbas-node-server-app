import model from "../Enrollments/model.js";

export async function findUsersForCourse(courseId) {
	const enrollments = await model.find({ course: courseId }).populate("user");
	return enrollments.map((enrollment) => enrollment.user);
}

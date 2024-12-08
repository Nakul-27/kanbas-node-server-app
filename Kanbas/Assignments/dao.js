// dao.js
import Database from "../Database/index.js";

export function findAssignmentsByCourse(courseId) {
	return Database.assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
	const newAssignment = { ...assignment, _id: Date.now().toString() };
	Database.assignments = [...Database.assignments, newAssignment];
	return newAssignment;
}

export function deleteAssignment(assignmentId) {
	Database.assignments = Database.assignments.filter(
		(assignment) => assignment._id !== assignmentId
	);
}

export function updateAssignment(assignmentId, assignmentUpdates) {
	const assignment = Database.assignments.find(
		(assignment) => assignment._id === assignmentId
	);
	if (assignment) {
		Object.assign(assignment, assignmentUpdates);
	}
	return assignment;
}

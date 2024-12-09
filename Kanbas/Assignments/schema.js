import mongoose from "mongoose";
const schema = new mongoose.Schema(
	{
		title: String,
		course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
		points: String,
		due_date: String,
		available_from: String,
		until: String,
		description: String,
	},
	{ collection: "assignments" }
);
export default schema;

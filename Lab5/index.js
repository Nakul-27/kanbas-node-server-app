import Module from "./Module.js";
import PathParametes from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import WorkingWithObjects from "./WorkingWithObjects.js";

export default function Lab5(app) {
	app.get("/lab5/welcome", (_, res) => {
		res.send("Welcome to Lab 5");
	});
	app.get("/", (_, res) => {
		res.send("Node Server App");
	});
	PathParametes(app);
	QueryParameters(app);
	WorkingWithObjects(app);
	Module(app);
	WorkingWithArrays(app);
}

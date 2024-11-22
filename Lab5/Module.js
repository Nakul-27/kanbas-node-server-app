const module = {
	id: "1",
	name: "Module Name",
	description: "Module Description",
	course: "123"
};

export default function Module(app) {
	app.get("/lab5/module", (req, res) => {
		res.json(module);
	});
	app.get("/lab5/module/name", (req, res) => {
		res.json(module.name);
	});
}

import "dotenv/config";
import express from 'express';
// import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from "cors";
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import UserRoutes from "./Kanbas/Users/routes.js";
import session from 'express-session';
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.get("/", (_, res) => {
	res.send("Node Server App. To visit the Lab 5 Materials, append to `/lab5/` to the url. To visit the Kanbas Materials, `/api/courses/` and paths like that to the url.");
});
app.use(
	cors({
		origin: process.env.NODE_ENV === "development"
			? "http://localhost:3000" // Local frontend
			: process.env.NETLIFY_URL, // Deployed frontend
		credentials: true,
	})
);
const sessionOptions = {
	secret: process.env.SESSION_SECRET || "kanbas",
	resave: false,
	saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
		domain: process.env.NODE_SERVER_DOMAIN,
	};
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

// Hello(app)
Lab5(app)

app.listen(process.env.PORT || 4000)

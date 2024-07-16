import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";

import ErrorHandler from "./utils/ErrorHandler";
import errorHandler from "./middlewares/errorsHandler";
import personRoutes from "./routes/personRoutes";
import groupRoutes from "./routes/groupRoutes";

const app: Application = express();
const port = 3000;

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE",
	);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Credentials", "true");

	if (req.method === "OPTIONS") {
		res.sendStatus(200);
	} else {
		next();
	}
});
app.use(errorHandler);
app.use(express.json());

app.use("/persons", personRoutes);
app.use("/groups", groupRoutes);

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
	next(new ErrorHandler("This is a test error!", 400));
});

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});

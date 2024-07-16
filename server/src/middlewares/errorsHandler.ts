import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

const errorHandler = (
	err: ErrorHandler,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
};

export default errorHandler;

import createError from "http-errors";

// error handler 404 - route does not exist
export const noRouteHandler = (req, res, next) => {
    next(createError(404, 'Not Found! 😠'));
}





// main error handler - internal server problem
export const mainErrorHandler = (err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).send({ error: err.message }) // make error status dynamic by trying to read the status of the actual error and send the message of the property.
    }
}
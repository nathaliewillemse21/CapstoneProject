function errorHandling(err, req, res, next) {
    if (err || res.statusCode >= 404) {
        res.json({
            status: err.status || res.statusCode || 502,
            msg: 'An error has occured. Please try again later.'
        })
    } else {
        next()
    }
} export {
    errorHandling
}
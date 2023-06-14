function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.name === 'SequelizeValidationError') {
        let dataErr = err.errors.map((er) => {
            return er.message;
        });
        const msg = dataErr.join();
        res.status(400).json({
            message: msg,
        });
    } else if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            message: 'Invalid token',
        });
    } else if (err.name === 'SequelizeDatabaseError') {
        res.status(400).json({
            message: err.message,
        });
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        let dataErr = err.errors.map((er) => {
            return er.message;
        });
        const msg = dataErr.join();
        res.status(400).json({
            message: msg,
        });
    } else if (err.name) {
        res.status(err.code).json({
            message: err.message,
        });
    } else {
        console.log(err)
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}

module.exports = errorHandler;
export const checkRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ status: 401, message: 'Unauthorized' });
        }
        if (req.user.role !== role) {
            return res.status(403).send({ status: 403, message: 'You are not allowed to enter' });
        }
        next();
    };
};
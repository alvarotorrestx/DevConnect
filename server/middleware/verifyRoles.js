const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user?.role) return res.sendStatus(401);

        const userRoles = Array.isArray(req.user.role) ? req.user.role : [req.user.role];

        const hasRole = userRoles.some(role => allowedRoles.includes(role));

        if (!hasRole) return res.sendStatus(403);

        next();
    };
};

module.exports = {
    verifyRoles
}
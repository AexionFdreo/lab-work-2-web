const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Доступ заборонено' });
    }
    next();
};

module.exports = adminMiddleware;
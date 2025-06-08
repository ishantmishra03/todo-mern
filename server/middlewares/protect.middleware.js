import jwt from 'jsonwebtoken';

export default protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.statys(401).json({ success: false, message: "Not Authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            req.user = decoded.user;
        }
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Token is invalid or expired" })
    }
};
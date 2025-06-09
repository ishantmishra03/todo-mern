import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            req.userId = decoded.id;
        }
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Token is invalid or expired" })
    }
};

export default protect;
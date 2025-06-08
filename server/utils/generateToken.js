import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

export default generateToken;
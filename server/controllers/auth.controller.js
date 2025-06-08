import bcrypt from 'bcrypt';
import userModel from '../models/user.models.js';
import imageKit from '../config/imagekit.config.js';
import generateToken from '../utils/generateToken.js'


//Register functionality
export const signup = async (req, res) => {
    try {
        // Get required fields from frontend
        const { name, email, password } = req.body;
        const image = req.file;


        // Check all fields before store in DB
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }
        if (!image) {
            return res.json({ success: false, message: "All fields are required" });
        }

        //Checks if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        //Upload image to ImageKit
        const imageRes = await imageKit.upload({
            file: image.buffer,
            fileName: image.originalname,
        });


        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            profileAvatar: imageRes.url, //ImageKit Uploaded URL
        });

        //Generate token
        let token = generateToken(user);

        //Sets token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: "Registered Successfully", userData: { name: user.name, avatar: user.profileAvatar } });

    } catch (error) {
        return res.json({ success: false, message: error.message});
    }
}

//SignIn functionality
export const signin = async (req, res) => {
    try {
        //Get fields from frontend
        const { email, password } = req.body;

        //Check fields before login
        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        //Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        //Check password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        //Generate token
        let token = generateToken(user);

        //Sets token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ success: true, userData: { name: user.name, avatar: user.profileAvatar } });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Logout Functionality
export const signout = async (req, res) => {
    //Clear Cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    res.status(200).json({ message: 'Logged out' });
}
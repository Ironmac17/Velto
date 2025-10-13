const User = require("../models/User");
const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail"); // utility for sending emails

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Step 1: Request OTP
exports.requestOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const otp = crypto.randomInt(100000, 999999).toString();

        await Otp.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // expires in 5 min
        });

        await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}. It expires in 5 minutes.`);

        res.status(200).json({ message: "OTP sent to email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Step 2: Verify OTP & register
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp, fullName, password, profileImageUrl } = req.body;
        if (!email || !otp || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });
        if (otpRecord.expiresAt < new Date()) return res.status(400).json({ message: "OTP expired" });

        const user = await User.create({ email, fullName, password, profileImageUrl, isVerified: true });

        await Otp.deleteOne({ _id: otpRecord._id });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login (existing)
exports.loginUser = async (req, res) => {
    const { email, password } = req.body || {};
    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({ message: "Invalid email or password" });
        if(!user.isVerified) return res.status(403).json({ message: "Email not verified" });

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(401).json({ message: "Invalid email or password" });

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err){
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
};

// Get user info (existing)
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user info", error: err.message });
    }
};

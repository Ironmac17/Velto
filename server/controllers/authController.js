const User = require("../models/User");
const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};


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
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            type: "verify",
        });

        await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}. It expires in 5 minutes.`);

        res.status(200).json({ message: "OTP sent to email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp, fullName, password, profileImageUrl } = req.body;
        if (!email || !otp || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const otpRecord = await Otp.findOne({ email, otp, type: "verify" });
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


exports.loginUser = async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid email or password" });
        if (!user.isVerified) return res.status(403).json({ message: "Email not verified" });

        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user info", error: err.message });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        await Otp.deleteMany({ email, type: "reset" });

        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

        await Otp.create({ email, otp, expiresAt, type: "reset" });

        await sendEmail(email, "Password Reset OTP", `Your OTP is ${otp}. It expires in 5 minutes.`);

        res.status(200).json({ message: "Reset OTP sent to email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error sending reset OTP", error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const otpRecord = await Otp.findOne({ email, otp, type: "reset" });
        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });
        if (otpRecord.expiresAt < new Date()) {
            await Otp.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ message: "OTP expired" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = newPassword;
        await user.save();

        await Otp.deleteOne({ _id: otpRecord._id });

        res.status(200).json({ message: "Password reset successfully" });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error resetting password", error: err.message });
    }
};


exports.resendOtp = async (req, res) => {
    try {
        const { email, type } = req.body; // type: "verify" or "reset"
        if (!email || !type) return res.status(400).json({ message: "Email and type are required" });

        // Check if there is an existing OTP
        const existingOtp = await Otp.findOne({ email, type });
        const now = Date.now();

        if (existingOtp) {
            const diff = now - existingOtp.createdAt.getTime();
            if (diff < 60 * 1000) { // 1 min cooldown
                return res.status(429).json({ message: "Wait 1 minute before resending OTP" });
            }
            // Remove old OTP
            await Otp.deleteOne({ _id: existingOtp._id });
        }

        // Generate new OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(now + 5 * 60 * 1000); // 5 min expiry

        await Otp.create({ email, otp, expiresAt, type });

        await sendEmail(
            email,
            type === "reset" ? "Password Reset OTP" : "Verification OTP",
            `Your new OTP is ${otp}. It expires in 5 minutes.`
        );

        res.status(200).json({ message: "New OTP sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error resending OTP", error: err.message });
    }
};


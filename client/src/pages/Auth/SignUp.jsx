import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  // Form states
  const [step, setStep] = useState("requestOtp"); // "requestOtp" or "verifyOtp"
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await axiosInstance.post(API_PATHS.AUTH.REQUEST_OTP, { email });
      setStep("verifyOtp");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and complete registration
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!fullName || !password || !otp) {
      setError("Please fill all fields and enter OTP");
      return;
    }
    setError("");
    setLoading(true);

    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP, {
        email,
        fullName,
        password,
        otp,
        profileImageUrl,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details here
        </p>

        {step === "requestOtp" && (
          <form onSubmit={handleRequestOtp}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="abc@example.com"
              type="text"
            />
            {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <p className="text-[13px] text-slate-000 mt-3">
              Already have an account?{" "}
              <Link
                className="font-medium text-[#895bfc] underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        )}

        {step === "verifyOtp" && (
          <form onSubmit={handleVerifyOtp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="flex flex-col gap-4">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="Abc Xyz"
                type="text"
              />
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email"
                placeholder="abc@example.com"
                type="text"
                disabled
              />
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
              <Input
                value={otp}
                onChange={({ target }) => setOtp(target.value)}
                label="OTP"
                placeholder="Enter OTP sent to your email"
                type="text"
              />
            </div>

            {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP & Sign Up"}
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default SignUp;

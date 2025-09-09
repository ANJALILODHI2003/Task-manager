import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from '../../components/Inputs/profilePhotoSelector';
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
//import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
  e.preventDefault();
  setError("");

  if (!fullName) return setError("Please enter full name");
  if (!validateEmail(email)) return setError("Please enter a valid email address.");
  if (!password) return setError("Please enter the password");

  try {
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("adminInviteToken", adminInviteToken.trim());

    if (profilePic) {
      formData.append("profileImage", profilePic); // multer expects this name
    }

    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { token, role } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      updateUser(response.data);
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    }
  } catch (error) {
    if (error.response?.data?.message) setError(error.response.data.message);
    else setError("Something went wrong. Please try again.");
  }
};


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input value={fullName} onChange={setFullName} label="Full Name" placeholder="John Doe" type="text" />
            <Input value={email} onChange={setEmail} label="Email Address" placeholder="john@example.com" type="text" />
            <Input value={password} onChange={setPassword} label="Password" placeholder="Enter your password" type="password" />
            <Input value={adminInviteToken} onChange={setAdminInviteToken} label="Admin Invite Token" placeholder="6 Digit Code" type="text" />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md">
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

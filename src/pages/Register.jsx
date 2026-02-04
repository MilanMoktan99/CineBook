import React, { useState, useContext } from "react";
import { User, Mail, Lock, Chrome, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import { registerWithEmail, signInWithGoogle } from "../config/auth";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { register: formRegister, handleSubmit, formState: { errors, isSubmitted } } = useForm();

  const onSubmit = async (data) => {
    try {
      setError("");
      const userData = await registerWithEmail(data.name, data.email, data.password);
      login(userData);
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const userData = await signInWithGoogle();
      login(userData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="bg-black/80 border border-gray-800 p-8 rounded-2xl w-[360px] shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account 🍿</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        {isSubmitted && Object.keys(errors).length > 0 && (
          <div className="form-errors">
            {errors.name && <p className="text-red-500 mb-2">{errors.name.message}</p>}
            {errors.email && <p className="text-red-500 mb-2">{errors.email.message}</p>}
            {errors.password && <p className="text-red-500 mb-2">{errors.password.message}</p>}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <User className="absolute left-4 top-3 text-gray-400" size={18} />
            <input
              placeholder="Full Name"
              className="w-full bg-gray-800 text-white placeholder-gray-400 pl-11 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-600"
              {...formRegister("name", { required: "Name required" })}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-3 text-gray-400" size={18} />
            <input
              placeholder="Email"
              className="w-full bg-gray-800 text-white placeholder-gray-400 pl-11 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-600"
              {...formRegister("email", { required: "Email required",
                pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
               })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-gray-800 text-white placeholder-gray-400 pl-11 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-600"
              {...formRegister("password", { required: "Password required",
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain 1 uppercase, 1 lowercase, 1 number & 1 special character",
                },
               })}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold cursor-pointer" type="submit">
            Register
          </button>
        </form>

        <div className="text-center text-gray-400 my-4">or</div>

        <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 border border-gray-700 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          <Chrome size={18} />
          Continue with Google
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-red-500 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}

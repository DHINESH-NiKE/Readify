import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("/api/auth/login ", {
        email,
        password,
      });

      console.log("Login successful:", res.data);

      
      return true;
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);

      setWarning(error.response?.data?.message || "Login failed");

      setTimeout(() => {
        setWarning("");
      }, 3000);

      return false;
    }
  };

  const loginBtn = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setWarning("Email/password cannot be empty");

      setTimeout(() => {
        setWarning("");
      }, 3000);

      return;
    }

    const success = await login();

    if (success) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      {warning && (
        <div className="fixed top-5 right-5 z-50 rounded-xl bg-white px-5 py-4 text-red-500 shadow-xl border border-red-200">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 font-bold">
              !
            </span>

            <span className="text-sm font-medium">{warning}</span>
          </div>
        </div>
      )}

      <img
        className="w-15 mt-3 ml-3"
        src="/images/logos/icon_no_bg.png"
        alt="Readify"
      />

      <div className="px-8">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-secondry">
              Hello
              <br />
              Welcome back
            </h1>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Welcome back to Readify. Discover new stories, find your next
              favorite book, and shop with ease.
            </p>
          </div>

          <form className="space-y-5" onSubmit={loginBtn}>
            <div className="relative">
              <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2" />

              <input
                className="py-4 pl-12 pr-4 w-full rounded-xl border text-sm text-gray-700 outline-none focus:ring-2 ring-four focus:border-white"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <MdOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2" />

              <input
                className="py-4 pl-12 pr-12 w-full rounded-xl border text-sm text-gray-700 outline-none focus:ring-2 ring-four focus:border-white"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="absolute top-5 right-4 cursor-pointer"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEye className="size-4" />
                ) : (
                  <FaRegEyeSlash className="size-4" />
                )}
              </button>
            </div>

            <div className="flex justify-end">
              <button type="button" className="hover:border-b cursor-pointer">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="border rounded-xl w-full py-2 bg-secondry border-white hover:scale-[1.01] hover:shadow-xl cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="my-7 flex items-center">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs font-medium text-gray-400 px-3">OR</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="relative">
            <button
              type="button"
              className="w-full border py-4 cursor-pointer rounded-xl"
            >
              Login with Google
              <FcGoogle className="absolute top-5.5 left-34" />
            </button>
          </div>

          <div className="text-center pt-4">
            Doesn't have an account?{" "}
            <button
              type="button"
              className="text-blue-500 cursor-pointer hover:border-b"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

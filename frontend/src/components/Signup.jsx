import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {Link,useNavigate} from "react-router-dom";


const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate=useNavigate();


  const onSubmithandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);

      }
    } catch (e) {
      console.log(e);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  const handleCheckboxChange = (gender) => {
    // Set the gender state directly (toggle behavior is expected)
    setUser({ ...user, gender });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Create an Account
        </h2>

        <form onSubmit={onSubmithandler} action="">
          <div className="space-y-4">
            {/* Full Name input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                type="text"
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="John Doe"
              />
            </div>

            {/* Username input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="username please"
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="******"
              />
            </div>

            {/* Confirm Password input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                type="password"
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="******"
              />
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Gender
              </label>
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-6">
                  <input
                    type="radio"
                    checked={user.gender === "male"}
                    onChange={() => setUser({ ...user, gender: "male" })}
                    id="male"
                    className="h-4 w-4 text-teal-500 border-gray-600 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="male" className="ml-2 text-sm text-gray-300">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={user.gender === "female"}
                    onChange={() => setUser({ ...user, gender: "female" })}
                    id="female"
                    className="h-4 w-4 text-teal-500 border-gray-600 rounded focus:ring-teal-500"
                  />
                  <label
                    htmlFor="female"
                    className="ml-2 text-sm text-gray-300"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full p-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-teal-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

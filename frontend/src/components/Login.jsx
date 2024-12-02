import React,{useState} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import {setAuthUser}  from '../redux/userSlice';

const Login = () => {

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const dispatch=useDispatch();

  const navigate=useNavigate();

  const onSubmithandler =async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

     
        navigate("/");
        dispatch(setAuthUser(res.data));
        toast.success(res.data.message);

      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(e);
    }
    
    setUser({
      username: "",
      password: ""

    })
  };


  return (

    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
      
      <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-teal-500 text-center">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
    Chat
  </span>
  <span className="text-white">Karo</span>
</h1>

        
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Login to Your Account</h2>
        
        <form onSubmit={onSubmithandler}>
          <div className="space-y-4">
            {/* Email input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">username</label>
              <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" 
               
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
                placeholder="Please enter your username" 
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
              value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password" 
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
                placeholder="******" 
              />
            </div>

            {/* Remember Me checkbox */}
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-teal-500 border-gray-600 rounded focus:ring-teal-500"
              />
              <label className="ml-2 text-sm text-gray-300">Remember Me</label>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button 
                type="submit" 
                className="w-full p-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Log In
              </button>
            </div>
          </div>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account? 
          <a href="/register" className="text-teal-500 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  )
}

export default Login

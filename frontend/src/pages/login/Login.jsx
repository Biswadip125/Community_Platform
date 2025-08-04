import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../utils/constant";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BACKEND_API_URL}/auth/login`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log("Error in login:", err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <form
        className="max-w-md w-full bg-white/10 backdrop-blur-2xl border border-white/20 p-6 flex flex-col gap-5 rounded-2xl shadow-xl"
        onSubmit={handleLogin}
      >
        <h1 className="text-center text-3xl font-bold text-black">
          Login <span className="text-blue-500">DevLink</span>
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-black/80">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={userDetails.email}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-black/80"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={userDetails.password}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <Link
          to={"/signup"}
          className="text-center hover:underline hover:text-blue-500"
        >
          Don't have an account? Signup
        </Link>

        <button className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition duration-200 cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

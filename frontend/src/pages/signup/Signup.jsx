import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_API_URL}/auth/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log("Error in Signup:", err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <form
        className="max-w-md w-full bg-white/10 backdrop-blur-2xl border border-white/20 p-6 flex flex-col gap-5 rounded-2xl shadow-xl"
        onSubmit={handleSignup}
      >
        <h1 className="text-center text-3xl font-bold text-black">
          Signup <span className="text-blue-500">DevLink</span>
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-black/80">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={user.name}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-black/80">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={user.email}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            onChange={(e) => handleChange(e)}
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
            value={user.password}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <Link
          to={"/login"}
          className="text-center hover:underline hover:text-blue-500"
        >
          Already have an account? Login
        </Link>

        <button className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition duration-200 cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

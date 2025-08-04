import { Link } from "react-router-dom";
import { Home, LogOut, User2 } from "lucide-react";
import axios from "axios";
import { BACKEND_API_URL } from "../utils/constant";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
const Header = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${BACKEND_API_URL}/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(null);
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log("Error in Logout:", err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <header className=" max-w-5xl mx-auto px-4 py-2 bg-white/10 backdrop-blur-3xl w-full my-4 rounded-full shadow-lg flex justify-between items-center">
      <h1 className="text-3xl text-blue-500 font-bold">DevLink</h1>

      <div className="flex flex-1 items-center justify-end gap-4">
        <Link
          to={"/"}
          className=" text-black hover:text-black/60 transition-all duration-200"
        >
          <Home />
        </Link>
        <Link
          to={"/profile"}
          className=" text-black hover:text-black/60 transition-all duration-200"
        >
          <User2 />
        </Link>
        <button className="cursor-pointer" onClick={handleLogout}>
          <LogOut className=" text-black hover:text-black/60 transition-all duration-200" />
        </button>
      </div>
    </header>
  );
};

export default Header;

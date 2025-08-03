import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Header from "./components/Header";
import Login from "./pages/login/login";
import Homepage from "./pages/homepage/Homepage";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-white px-2 md:px-0">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Homepage />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

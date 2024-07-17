import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import List from "./pages/List.js";
import Profile from "./pages/Profile.js";
import "./reset.css";
import Auth from "./components/Auth.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/kakao" element={<Auth />} />
          <Route path="/users" element={<Profile />} />
          <Route path="/users/list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

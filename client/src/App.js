import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import GuestProtectedRoute from "./components/auth/GuestProtectedRoute.tsx";
import Main from "./pages/main/Main.tsx";
import UserProtectedRoute from "./components/auth/UserProtectedRoute.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Research from "./pages/research/Research.tsx";
import Training from "./pages/training/Training.tsx";
import Quizzes from "./pages/quizzes/Quizzes.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <UserProtectedRoute route="">
              <Login />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UserProtectedRoute route="">
              <Register />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <GuestProtectedRoute route="">
              <Main />
            </GuestProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/research" element={<Research />} />
          <Route path="/training" element={<Training />} />
          <Route path="/quizzes" element={<Quizzes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

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
import ManageGroup from "./pages/dashboard/Admin/ManageGroup/ManageGroup.tsx";
import AdminDashboard from "./pages/dashboard/Admin/AdminDashboard.tsx";
import MenteeDashboard from "./pages/dashboard/Mentee/MenteeDashboard.tsx";
import MentorDashboard from "./pages/dashboard/Mentor/MentorDashboard.tsx";

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
            <GuestProtectedRoute route="login">
              <Main />
            </GuestProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="admin" element={<AdminDashboard />}>
              <Route path="group/:groupId" element={<ManageGroup />} />
            </Route>
            <Route path="mentor" element={<MentorDashboard />}>
              <Route path="group/:groupId" element={<ManageGroup />} />
            </Route>
            <Route path="" element={<MenteeDashboard />} />
          </Route>
          <Route path="/research" element={<Research />} />
          <Route path="/training" element={<Training />} />
          <Route path="/quizzes" element={<Quizzes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

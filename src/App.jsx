import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";
import Report from "./pages/Report";
import Budget from "./pages/Budget";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transaction />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reports" element={<Report />} />
      <Route path="/budgets" element={<Budget />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
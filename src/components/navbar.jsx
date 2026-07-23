function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  import { useTheme } from "../context/ThemeContext";

  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center p-4 shadow-md">

      <h1 className="text-2xl font-bold">
        Expense Tracker
      </h1>
        <button
            onClick={toggleTheme}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
      <div className="flex items-center gap-4">

        <span>
          👤 {user?.name}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
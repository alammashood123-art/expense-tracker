import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-6">

      <h2 className="text-xl font-bold mb-8">
        Menu
      </h2>

      <div className="space-y-4">

        <Link
          to="/dashboard"
          className="block hover:text-blue-600"
        >
          Dashboard
        </Link>

        <Link
          to="/transactions"
          className="block hover:text-blue-600"
        >
          Transactions
        </Link>

        <Link
          to="/profile"
          className="block hover:text-blue-600"
        >
          Profile
        </Link>
        <Link
            to="/reports"
            className="block hover:text-blue-600"
            >
            Reports
        </Link>
        <Link
            to="/profile"
            className="block py-2 hover:text-blue-600"
            >
            Profile
            </Link>
        <Link
            to="/budgets"
             > 
            Budgets
            </Link>
        <Link to="/settings">
        Settings
        </Link>
        <Link to="/dashboard">
    Dashboard
</Link>
      </div>

    </div>
  );
}

export default Sidebar;
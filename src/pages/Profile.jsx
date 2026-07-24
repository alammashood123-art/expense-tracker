import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    createdAt: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
          User Profile
        </h1>

        <div className="space-y-6">

          <div>
            <label className="font-semibold dark:text-gray-300">
              Name
            </label>

            <p className="text-lg dark:text-white">
              {user.name}
            </p>
          </div>

          <div>
            <label className="font-semibold dark:text-gray-300">
              Email
            </label>

            <p className="text-lg dark:text-white">
              {user.email}
            </p>
          </div>

          <div>
            <label className="font-semibold dark:text-gray-300">
              Joined
            </label>

            <p className="text-lg dark:text-white">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;
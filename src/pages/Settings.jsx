import { useEffect, useState } from "react";

function Settings() {
  const [currency, setCurrency] = useState("PKR");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    const savedDateFormat = localStorage.getItem("dateFormat");

    if (savedCurrency) setCurrency(savedCurrency);
    if (savedDateFormat) setDateFormat(savedDateFormat);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("currency", currency);
    localStorage.setItem("dateFormat", dateFormat);

    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
          Settings
        </h1>

        <div className="mb-4">
          <label className="block mb-2 dark:text-white">
            Currency
          </label>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="PKR">PKR (₨)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 dark:text-white">
            Date Format
          </label>

          <select
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <button
          onClick={saveSettings}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Save Settings
        </button>

      </div>
    </div>
  );
}

export default Settings;
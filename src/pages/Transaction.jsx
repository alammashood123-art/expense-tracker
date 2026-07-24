import { useEffect, useState } from "react";
import API, {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../services/transactionService";
import TransactionTable from "../components/TransactionTable";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
    note: "",
    isRecurring: false,
    frequency: "monthly",
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: "",
      note: "",
      isRecurring: false,
      frequency: "monthly",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/", formData);

      alert(response.data.message);

      resetForm();
      loadTransactions();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add transaction");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      await deleteTransaction(id);
      loadTransactions();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);

    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date
        ? transaction.date.split("T")[0]
        : "",
      note: transaction.note || "",
      isRecurring: transaction.isRecurring || false,
      frequency: transaction.frequency || "monthly",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateTransaction(editingId, formData);

      alert("Transaction Updated Successfully");

      resetForm();
      loadTransactions();
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "all" || transaction.type === filterType;

    const matchesCategory =
      filterCategory === "all" ||
      transaction.category === filterCategory;

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="all">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
          </select>

        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            {editingId ? "Edit Transaction" : "Add Transaction"}
          </h1>

          <form
            onSubmit={editingId ? handleUpdate : handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="note"
              placeholder="Note"
              value={formData.note}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <div className="md:col-span-3">

              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleChange}
                />
                Recurring Transaction
              </label>

              {formData.isRecurring && (
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full mb-3"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              )}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mr-3"
              >
                {editingId ? "Update Transaction" : "Add Transaction"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            All Transactions
          </h2>

          <TransactionTable
            transactions={filteredTransactions}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

        </div>

      </div>
    </div>
  );
}

export default Transaction;
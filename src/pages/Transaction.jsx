import { useEffect, useState } from "react";
import API, {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../services/transactionService";
import TransactionTable from "../components/TransactionTable";

function Transactions() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const filteredTransactions = transactions.filter((transaction) => {

  const matchesSearch =
    transaction.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesType =
    filterType === "all"
      ? true
      : transaction.type === filterType;

  const matchesCategory =
    filterCategory === "all"
      ? true
      : transaction.category === filterCategory;

  return (
    matchesSearch &&
    matchesType &&
    matchesCategory
  );
});
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
  title: "",
  amount: "",
  category: "",
  type: "",
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    });
  };

  // ADD TRANSACTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/", formData);

      alert(response.data.message);

      resetForm();

      loadTransactions();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add transaction"
      );
    }
  };

  // DELETE TRANSACTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);

      loadTransactions();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // EDIT BUTTON
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
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UPDATE TRANSACTION
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateTransaction(editingId, formData);

      alert("Transaction Updated Successfully");

      resetForm();

      loadTransactions();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Update Failed"
      );
    }
  };
const filteredTransactions = transactions.filter((transaction) => {
  const matchesSearch = transaction.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "All" ||
    transaction.category === categoryFilter;

  const matchesType =
    typeFilter === "All" ||
    transaction.type === typeFilter;

  return (
    matchesSearch &&
    matchesCategory &&
    matchesType
  );
});

  return (

    
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">
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

            <option value="all">
            All Types
            </option>

            <option value="income">
            Income
            </option>

            <option value="expense">
            Expense
            </option>

        </select>

        <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded-lg p-3"
        >

            <option value="all">
            All Categories
            </option>

            <option value="Food">Food</option>

            <option value="Transport">Transport</option>

            <option value="Bills">Bills</option>

            <option value="Shopping">Shopping</option>

            <option value="Salary">Salary</option>

        </select>

        </div>
        {/* FORM */}
        

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          <h1 className="text-3xl font-bold text-blue-600 mb-6">

            {editingId
              ? "Edit Transaction"
              : "Add Transaction"}

          </h1>

          <form
          
            onSubmit={
              editingId
                ? handleUpdate
                : handleSubmit
            }
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
              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>
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

            <div className="md:col-span-2 flex gap-3">
              <div>

            <label className="block mb-2">
            Recurring Transaction
            </label>

            <input
            type="checkbox"
            checked={formData.isRecurring}
            onChange={(e)=>
            setFormData({
            ...formData,
            isRecurring:e.target.checked
            })
            }
            />
            {formData.isRecurring && (

                <div>

                <label>
                Frequency
                </label>

                <select
                value={formData.frequency}
                onChange={(e)=>
                setFormData({
                ...formData,
                frequency:e.target.value
                })
                }
                className="border p-3 rounded-lg w-full"
                >

                <option value="daily">
                Daily
                </option>

                <option value="weekly">
                Weekly
                </option>

                <option value="monthly">
                Monthly
                </option>

                <option value="yearly">
                Yearly
                </option>

                </select>

                </div>

                )}

            </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                {editingId
                  ? "Update Transaction"
                  : "Add Transaction"}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <input
    type="text"
    placeholder="Search by title..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg p-3"
  />

  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="border rounded-lg p-3"
  >
    <option value="All">All Categories</option>
    <option value="Food">Food</option>
    <option value="Transport">Transport</option>
    <option value="Shopping">Shopping</option>
    <option value="Bills">Bills</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Salary">Salary</option>
    <option value="Other">Other</option>
  </select>

  <select
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
    className="border rounded-lg p-3"
  >
    <option value="All">All Types</option>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
  </select>

</div>
        {/* TABLE */}

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

export default Transactions;
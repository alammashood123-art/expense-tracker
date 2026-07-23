import { useEffect, useState } from "react";
import {
  getBudgets,
  createBudget,
  deleteBudget,
} from "../services/budgetService";
import { getTransactions } from "../services/transactionService";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  });
  const loadData = async () => {
  try {
    const budgetRes = await getBudgets();
    setBudgets(budgetRes.data);

    const transactionRes = await getTransactions();
    setTransactions(transactionRes.data);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      const res = await getBudgets();
      setBudgets(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  loadData();
    }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBudget(formData);

      setFormData({
        category: "",
        amount: "",
      });

      loadBudgets();

    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget?")) return;

    await deleteBudget(id);

    loadBudgets();
  };
  const getSpentAmount = (category) => {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === "expense" &&
        transaction.category === category
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-6">
            Budget Management
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-col-3 gap-4"
          >

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Budget Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <button
              className="bg-blue-600 text-white rounded-lg"
            >
              Save Budget
            </button>

          </form>

          <table className="w-full">

            <thead>

              <tr className="bg-blue-600 text-white">

                <th className="p-3">
                  Category
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {budgets.map((budget) => (

                <tr
                  key={budget._id}
                  className="border-b"
                >

                  <td className="p-3">
                    {budget.category}
                  </td>

                  <td>
                    Rs. {budget.amount}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleDelete(budget._id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Budget;
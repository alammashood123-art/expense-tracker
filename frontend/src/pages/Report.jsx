import { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionService";
import { exportPDF } from "../services/exportService";

function Reports() {
  const [report, setReport] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    transactions: [],
  });

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const response = await getTransactions();

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const monthlyTransactions = response.data.filter((transaction) => {
        const date = new Date(transaction.date);

        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      });

      let income = 0;
      let expense = 0;

      monthlyTransactions.forEach((transaction) => {
        if (transaction.type === "income") {
          income += Number(transaction.amount);
        } else {
          expense += Number(transaction.amount);
        }
      });

      setReport({
        income,
        expense,
        balance: income - expense,
        transactions: monthlyTransactions,
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Monthly Report
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-green-500 text-white rounded-xl p-6">
            <h2>Income</h2>
            <h1 className="text-3xl font-bold">
              Rs. {report.income.toLocaleString()}
            </h1>
          </div>

          <div className="bg-red-500 text-white rounded-xl p-6">
            <h2>Expense</h2>
            <h1 className="text-3xl font-bold">
              Rs. {report.expense.toLocaleString()}
            </h1>
          </div>

          <div className="bg-blue-500 text-white rounded-xl p-6">
            <h2>Balance</h2>
            <h1 className="text-3xl font-bold">
              Rs. {report.balance.toLocaleString()}
            </h1>
          </div>

        </div>

        <div className="flex justify-end mb-6">
        <button
            onClick={() =>
            exportPDF(report.transactions, report)
            }
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
            Download PDF
        </button>

        </div>
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Transactions This Month
          </h2>

          {report.transactions.length === 0 ? (
            <p>No transactions this month.</p>
          ) : (
            report.transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex justify-between border-b py-3"
              >
                <div>
                  <h3>{transaction.title}</h3>
                  <p className="text-gray-500">
                    {transaction.category}
                  </p>
                </div>

                <span
                  className={
                    transaction.type === "income"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  Rs. {transaction.amount}
                </span>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Reports;
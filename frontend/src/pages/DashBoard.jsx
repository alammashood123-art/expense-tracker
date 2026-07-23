import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import { getDashboardData } from "../services/dashboardService";
import BarChartComponent from "../components/charts/BarChartComponent";
import PieChartComponent from "../components/charts/PieChartComponent";
import { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionService";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

const [summary, setSummary] = useState({
  income: 0,
  expense: 0,
  balance: 0,
});
  const [data, setData] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    savings: 0,
    transactions: [],
  });

  useEffect(() => {
  loadTransactions();
}, []);

const loadTransactions = async () => {
  try {
    const res = await getTransactions();

    setTransactions(res.data);

    calculateSummary(res.data);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const dashboardData =
        await getDashboardData();

      setData(dashboardData);

    } catch (error) {

      console.log(error);

    }
  };

  const calculateSummary = (data) => {

  let income = 0;
  let expense = 0;

  data.forEach((transaction) => {

    if (transaction.type === "income") {

      income += Number(transaction.amount);

    } else {

      expense += Number(transaction.amount);

    }

  });

  setSummary({
    income,
    expense,
    balance: income - expense,
  });

};

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

  <div className="bg-green-500 text-white p-6 rounded-xl">

    <h2>Total Income</h2>

    <p className="text-3xl font-bold">

      ₨ {summary.income}

    </p>

  </div>

  <div className="bg-red-500 text-white p-6 rounded-xl">

    <h2>Total Expenses</h2>

    <p className="text-3xl font-bold">

      ₨ {summary.expense}

    </p>

  </div>

  <div className="bg-blue-500 text-white p-6 rounded-xl">

    <h2>Balance</h2>

    <p className="text-3xl font-bold">

      ₨ {summary.balance}

    </p>

  </div>

</div>

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8 bg-gray-100 min-h-screen">

          <h1 className="text-3xl font-bold mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <SummaryCard
              title="Balance"
              amount={data.balance.toLocaleString()}
              color="bg-blue-500"
            />

            <SummaryCard
              title="Income"
              amount={data.income.toLocaleString()}
              color="bg-green-500"
            />

            <SummaryCard
              title="Expense"
              amount={data.expense.toLocaleString()}
              color="bg-red-500"
            />

            <SummaryCard
              title="Savings"
              amount={data.savings.toLocaleString()}
              color="bg-purple-500"
            />

          </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">

<h2 className="text-2xl font-bold mb-4 dark:text-white">

Recent Transactions

</h2>

<table className="min-w-full">

<thead>

<tr>

<th>Title</th>

<th>Amount</th>

<th>Type</th>

</tr>

</thead>

<tbody>

{transactions.slice(0,5).map((transaction)=>(

<tr key={transaction._id}>

<td>{transaction.title}</td>

<td>₨ {transaction.amount}</td>

<td>{transaction.type}</td>

</tr>

))}

</tbody>

</table>

</div>
            <div className="grid md:grid-cols-2 gap-8 mt-10">

                <BarChartComponent
                    income={data.income}
                    expense={data.expense}
                />

                <PieChartComponent
                    income={data.income}
                    expense={data.expense}
                />

            </div>
          <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

            <h2 className="text-2xl font-bold mb-5">
              Recent Transactions
            </h2>

            {data.transactions.length === 0 ? (

              <p>No Transactions Yet</p>

            ) : (

              data.transactions.slice(0,5).map((transaction)=>(

                <div
                  key={transaction._id}
                  className="flex justify-between border-b py-3"
                >

                  <div>

                    <h3 className="font-semibold">
                      {transaction.title}
                    </h3>

                    <p className="text-gray-500">
                      {transaction.category}
                    </p>

                  </div>

                  <h3
                    className={
                      transaction.type==="income"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                    }
                  >
                    Rs. {transaction.amount}
                  </h3>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default Dashboard;
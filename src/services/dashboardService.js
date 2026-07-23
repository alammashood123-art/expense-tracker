import { getTransactions } from "./transactionService";

export const getDashboardData = async () => {
  const response = await getTransactions();

  const transactions = response.data;

  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      income += Number(transaction.amount);
    } else {
      expense += Number(transaction.amount);
    }
  });

  return {
    transactions,
    income,
    expense,
    balance: income - expense,
    savings: income - expense,
  };
};
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (transactions, summary) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Expense Tracker Report", 14, 20);

  doc.setFontSize(12);

  doc.text(`Income: Rs. ${summary.income}`, 14, 35);
  doc.text(`Expense: Rs. ${summary.expense}`, 14, 45);
  doc.text(`Balance: Rs. ${summary.balance}`, 14, 55);

  autoTable(doc, {
    startY: 70,
    head: [["Date", "Title", "Category", "Type", "Amount"]],
    body: transactions.map((transaction) => [
      new Date(transaction.date).toLocaleDateString(),
      transaction.title,
      transaction.category,
      transaction.type,
      transaction.amount,
    ]),
  });

  doc.save("Expense_Report.pdf");
};
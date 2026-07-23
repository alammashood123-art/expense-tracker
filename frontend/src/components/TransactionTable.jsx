function TransactionTable({ transactions, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-center">Actions</th>
            <th>Recurring</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            filteredtransactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>

                <td className="p-4 font-medium">
                  {transaction.title}
                </td>

                <td className="p-4">
                  {transaction.category}
                </td>

                <td
                  className={`p-4 font-semibold capitalize ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type}
                </td>

                <td
                  className={`p-4 font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Rs. {Number(transaction.amount).toLocaleString()}
                </td>
                <td>

                        {transaction.isRecurring
                        ? transaction.frequency
                        : "-"}

                        </td>

                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(transaction._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center py-8 text-gray-500"
              >
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
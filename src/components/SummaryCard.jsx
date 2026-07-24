function SummaryCard({ title, amount, color }) {
  return (
    <div
      className={`rounded-xl p-6 text-white shadow-lg ${color}`}
    >
      <h2 className="text-lg">{title}</h2>

      <h1 className="text-3xl font-bold mt-3">
        Rs. {amount}
      </h1>
    </div>
  );
}

export default SummaryCard;
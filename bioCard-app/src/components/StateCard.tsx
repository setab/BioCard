export default function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-4 border border-gray-200">
      <div className="mb-2">{icon}</div>
      <div className="font-semibold text-lg">{value}</div>
      <div className="text-gray-500 text-sm">{title}</div>
    </div>
  );
}

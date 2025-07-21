import { Link } from "@tanstack/react-router";

export default function DashboardCard({
  icon,
  title,
  description,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group bg-white border border-blue-100 rounded-lg shadow hover:shadow-md transition p-5 flex flex-col items-center text-center hover:bg-blue-50"
    >
      <div className="mb-2">{icon}</div>
      <div className="font-bold text-blue-700 group-hover:text-blue-900">
        {title}
      </div>
      <div className="text-gray-500 text-xs mt-1">{description}</div>
    </Link>
  );
}

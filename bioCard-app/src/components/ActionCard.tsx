export default function ActionCard({
  icon,
  title,
  subtitle,
  color,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  className: string;
}) {
  return (
    <div
      className={`rounded-lg shadow flex items-center gap-4 p-6 font-semibold text-white ${color} ${className}`}
    >
      <div>{icon}</div>
      <div>
        <div className="text-lg">{title}</div>
        <div className="text-sm font-normal">{subtitle}</div>
      </div>
    </div>
  );
}

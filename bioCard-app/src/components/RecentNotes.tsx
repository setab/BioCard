const recentNotes = [
  {
    doctor: "Dr. Sarah Johnson",
    note: "Regular checkup. Patient reports feeling well.",
    date: "1/15/2024",
    tags: ["Healthy"],
  },
  {
    doctor: "Dr. Michael Brown",
    note: "Follow-up for hypertension management.",
    date: "12/1/2023",
    tags: ["Hypertension - controlled"],
  },
];

export default function RecentNotes() {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="font-semibold text-lg mb-4">Recent Notes</div>
        <ul>
          {recentNotes.map((n, idx) => (
            <li key={idx} className="py-2 border-b last:border-b-0">
              <div className="flex justify-between items-center">
                <div className="font-medium">{n.doctor}</div>
                <div className="text-xs text-gray-500">{n.date}</div>
              </div>
              <div className="text-sm text-gray-700">{n.note}</div>
              <div className="mt-1 flex gap-2">
                {n.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

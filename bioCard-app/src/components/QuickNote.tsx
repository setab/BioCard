import ActionCard from "./ActionCard";
import { Plus } from "lucide-react";

export default function QuickNote() {
  return (
    <ActionCard
      icon={
        <div className="transition-transform duration-200 group-hover:scale-125">
          <Plus size={32} />
        </div>
      }
      title="Quick Note"
      subtitle="Add medical notes quickly"
      color="bg-emerald-600"
      className="group hover:shadow-xl hover:scale-[1.03] hover:bg-emerald-700 transition-all duration-200"
    />
  );
}

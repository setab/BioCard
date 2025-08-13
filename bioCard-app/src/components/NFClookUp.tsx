import ActionCard from "@/components/ActionCard";
import { Search } from "lucide-react";

export default function NFClookUp() {
  return (
    <>
      <ActionCard
        icon={
          <div className="transition-transform duration-200 group-hover:scale-125">
            <Search size={32} />
          </div>
        }
        title="NFC Patient Lookup"
        subtitle="Scan or search for patients"
        color="bg-blue-600"
        className="group hover:shadow-xl hover:scale-[1.03] hover:bg-blue-700 transition-all duration-200"
      />
    </>
  );
}

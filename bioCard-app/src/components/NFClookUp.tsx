import ActionCard from "@/components/ActionCard";
import { Search } from "lucide-react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";

export default function NFClookUp() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setExpanded(true)}>
        <ActionCard
          icon={
            <div className="transition-transform duration-200 group-hover:scale-125">
              <Search size={32} />
            </div>
          }
          title="NFC Patient Lookup"
          subtitle="Scan or search for patients"
          color="bg-blue-600"
          className="group cursor-pointer hover:shadow-xl hover:scale-[1.03] hover:bg-blue-700 transition-all duration-200"
        />
      </div>
      <Dialog
        open={expanded}
        onClose={() => setExpanded(false)}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-8 flex flex-col items-center justify-center gap-6 min-w-[280px]">
          <div className="flex items-center gap-2 mb-2">
            <Search size={28} className="text-blue-600" />
            <span className="text-xl font-bold text-gray-800">
              Scan NFC Card
            </span>
          </div>
          <div className="text-gray-600 text-center mb-4">
            Please scan the patient's NFC card to begin lookup.
          </div>
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold text-base"
            onClick={() => alert("Lookup button clicked!")}
          >
            Lookup
          </button>
        </div>
      </Dialog>
    </>
  );
}

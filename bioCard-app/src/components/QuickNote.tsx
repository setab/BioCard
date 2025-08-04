import { useState } from "react";
import ActionCard from "./ActionCard";
import { Plus } from "lucide-react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";

type NoteInput = {
  note: string;
  status: "Healthy" | "Follow-up needed" | "Critical" | "Not sure";
  images: FileList;
};

export default function QuickNote() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<NoteInput>();

  const QuickNoteSubmit = (data: NoteInput) => {
    console.log(data);
    console.log("submited");
    reset();
  };

  return (
    <>
      <Box onClick={() => setExpanded(true)}>
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
      </Box>
      <Dialog open={expanded} onClose={() => setExpanded(false)}>
        {/* <div>this is test quick note dialog</div> */}
        <form onSubmit={handleSubmit(QuickNoteSubmit)} className="space-y-2">
          <textarea
            {...register("note", { required: true })}
            placeholder="Write quick note..."
            className="w-full p-2 border rounded"
          />
          <select
            {...register("status", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="Healthy">Healthy</option>
            <option value="Follow-up needed">Follow-up needed</option>
            <option value="Critical">Critical</option>
            <option value="Not sure">Not sure</option>
          </select>
          <input
            type="file"
            accept="image/*"
            {...register("images")}
            multiple
          />
          <button type="submit">Save Note</button>
        </form>
      </Dialog>
    </>
  );
}

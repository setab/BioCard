import { useState } from "react";
import ActionCard from "./ActionCard";
import { Plus } from "lucide-react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

type NoteInput = {
  note: string;
  status: "Healthy" | "Follow-up needed" | "Critical" | "Not sure";
  images: FileList;
};

export default function QuickNote() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<NoteInput>();

  const QuickNoteMutation = useMutation({
    mutationFn: async (data: NoteInput) => {
      const formData = new FormData();
      formData.append("note", data.note);
      formData.append("status", data.status);
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/submitQuickNote`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to create note");
      return await res.json();
    },
    onSuccess: () => reset(),
  });

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

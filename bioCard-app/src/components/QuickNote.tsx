import { useState } from "react";
import ActionCard from "./ActionCard";
import { Plus } from "lucide-react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { AppointmentProp } from "./TodaysAppointments";

type NoteInput = {
  note: string;
  status: "Healthy" | "Follow-up needed" | "Critical" | "Not sure";
  images: FileList;
  patient_id: string;
};

export default function QuickNote({ userId }: { userId: string }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<NoteInput>();
  const queryClient = useQueryClient();

  const appointmentsQuery = useQuery({
    queryKey: ["appointments", userId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getPatientInfoWithDoctorId/${userId}`,
        { credentials: "include" }
      );
      return res.json();
    },
    enabled: !!userId,
  });

  const QuickNoteMutation = useMutation({
    mutationFn: async (data: NoteInput) => {
      const formData = new FormData();
      formData.append("note", data.note);
      formData.append("status", data.status);
      formData.append("userId", userId);
      formData.append("patient_id", data.patient_id);
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/doctorNotes`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to create note");
      return await res.json();
    },
    onSuccess: () => {
      reset();
      setExpanded(false);
      queryClient.invalidateQueries({ queryKey: ["recentNotes", userId] });
    },
  });

  const QuickNoteSubmit = (data: NoteInput) => {
    console.log(data);
    console.log("submited");
    QuickNoteMutation.mutate(data);
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
      <Dialog
        open={expanded}
        onClose={() => setExpanded(false)}
        maxWidth="md"
        fullWidth
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add Quick Note
          </h2>
          <form onSubmit={handleSubmit(QuickNoteSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note
              </label>
              <textarea
                {...register("note", { required: "Note is required" })}
                placeholder="Write quick note..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient
              </label>
              <select
                {...register("patient_id", { required: "Patient is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select Patient</option>
                {Array.isArray(appointmentsQuery.data) &&
                  appointmentsQuery.data.map((appt: AppointmentProp) => (
                    <option
                      key={appt.patient_user_id}
                      value={appt.patient_user_id}
                    >
                      {appt.patient_name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select status...</option>
                <option value="Healthy">Healthy</option>
                <option value="Follow-up needed">Follow-up needed</option>
                <option value="Critical">Critical</option>
                <option value="Not sure">Not sure</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("images")}
                multiple
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={QuickNoteMutation.isPending}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {QuickNoteMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Note</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}

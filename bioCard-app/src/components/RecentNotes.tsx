import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ExpandableImage } from "./ExpandableImage";

export type DoctorNoteProps = {
  id: string;
  note: string;
  status: string;
  images: string[];
  patient_id: string;
  created_at: string; // ISO date string
  patient_name: string;
};

export default function RecentNotes({ userId }: { userId: string }) {
  const [expanded, setExpanded] = useState(false);

  const { data, isLoading, error } = useQuery<DoctorNoteProps[]>({
    queryKey: ["recentNotes", userId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getDoctorNotesByDoctorUserId/${userId}`
      );
      return res.json() ?? [];
    },
    enabled: !!userId,
  });

  // Only show first 2 notes unless expanded
  // also acending
  const sortedNotes = data
    ? [...data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    : [];
  const visibleNotes = expanded ? sortedNotes : sortedNotes?.slice(0, 2);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <span>Loading notes...</span>
        </div>
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center h-40 text-red-600">
          <span>Error loading notes.</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 flex flex-col gap-4 transition-all duration-200 ${
        expanded
          ? "fixed inset-0 z-[1300] rounded-none shadow-2xl bg-white overflow-y-auto px-4 md:px-24 py-10"
          : "cursor-pointer hover:shadow-2xl hover:scale-[1.03]"
      }`}
      onClick={() => !expanded && setExpanded(true)}
      style={expanded ? { minWidth: "320px" } : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg mb-4">Recent Notes</div>
        {expanded && (
          <IconButton
            aria-label="close"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(false);
            }}
            sx={{ ml: 2 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>
      <ul className="space-y-2">
        {visibleNotes && visibleNotes.length > 0 ? (
          visibleNotes.map((note) => (
            <li
              key={note.id}
              className="p-4 rounded-lg transition-all duration-200 border border-gray-100 bg-gray-50"
            >
              <div className="font-medium text-gray-800 truncate">
                {note.note}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Patient: {note.patient_name} | Status: {note.status} |{" "}
                {new Date(note.created_at).toLocaleString()}
              </div>
              {expanded && note.images && note.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {note.images.map((img, i) => (
                    <ExpandableImage
                      key={i}
                      src={`${import.meta.env.VITE_API_BASE_URL}/${img}`}
                    />
                  ))}
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="text-gray-400">No notes found.</li>
        )}
      </ul>
      {!expanded && data && data.length > 2 && (
        <div className="text-center text-emerald-600 mt-2">
          Click to show all notes
        </div>
      )}
    </div>
  );
}

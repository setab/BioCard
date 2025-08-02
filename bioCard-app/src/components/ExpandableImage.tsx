import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useState } from "react";

export function ExpandableImage({
  src,
  alt,
  thumbStyle,
}: {
  src: string;
  alt?: string;
  thumbStyle?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={{
          width: 80,
          height: 80,
          objectFit: "cover",
          borderRadius: 4,
          border: "1px solid #eee",
          cursor: "pointer",
          ...thumbStyle,
        }}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
          />
        </Box>
      </Dialog>
    </>
  );
}

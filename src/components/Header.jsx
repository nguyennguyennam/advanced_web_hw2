/*
  Modern glass header with blur background and subtle shadow.
  Looks great on top of gallery images.
*/
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(146, 211, 206, 0.6)",
        backdropFilter: "blur(12px)",
        color: "#111",
        alignItems: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
          <PhotoCameraIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            letterSpacing: "0.5px",
            flexGrow: 1,
            color: "#978510ff",
          }}
        >
          An's Gallery App
        </Typography>

        <Box
          sx={{
            fontSize: "0.9rem",
            color: "#4b5563",
            fontWeight: 500,
          }}
        >
        </Box>
      </Toolbar>
    </AppBar>
  );
}

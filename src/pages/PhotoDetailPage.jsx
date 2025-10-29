/*
  PhotoDetailPage component
  ------------------------------------
  - Displays a detailed view of a selected photo.
  - If the photo data is passed via React Router's Link `state`, 
    it renders immediately without an extra API request.
  - If the page is accessed directly (e.g., reload or deep link),
    it fetches the photo details by ID from the Picsum API.
  - Includes graceful loading and error states.
*/

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchImageById } from "../services/photoApi";
import LoadSpinner from "../components/LoadingSpinner";
import { Alert, Box, Typography, AlertTitle } from "@mui/material";
import PhotoCard from "../components/PhotoCard";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export default function PhotoDetailPage() {
  // Extract the photo ID from the URL
  const { id } = useParams();

  // Retrieve photo data passed via navigation state (if any)
  const { state } = useLocation();

  // React Router navigation helper
  const navigate = useNavigate();

  // Initialize component state
  const [photo, setPhoto] = useState(state?.photo || null);
  const [loading, setLoading] = useState(!state?.photo);
  const [error, setError] = useState(null);

  // Fetch photo data only if not provided through navigation state
  useEffect(() => {
    if (!photo) {
      async function loadPhoto() {
        try {
          setLoading(true);
          const data = await fetchImageById(id);
          setPhoto(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      loadPhoto();
    }
  }, );

  // Loading state
  if (loading) return <LoadSpinner label="Loading photo..." />;

  // Error state
  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        <AlertTitle>Error while fetching image detail</AlertTitle>
        {error}
      </Alert>
    );
  }

  // Fallback if no photo data is available
  if (!photo)
    return <div className="p-6 text-gray-600">No photo found.</div>;

  // Render photo detail view
  return (
    <Box sx={{ overflow: "hidden", p: 2 }}>
      {/* Back navigation */}
      <Typography
        onClick={() => navigate(-1)}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",
          mt: 1.5,
          mb: 2,
          fontWeight: 600,
          color: "primary.main",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#1565c0",
            textDecoration: "underline",
            transform: "translateX(-4px)",
          },
        }}
      >
        <ArrowBackIosNewRoundedIcon fontSize="small" sx={{ mr: 0.5 }} />
        Back
      </Typography>

      {/* Photo metadata and image display */}
      <PhotoCard photo={photo} />
    </Box>
  );
}

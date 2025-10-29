/*
    Component using Card from MUI to show information about a photo in a card format.
    It will display the photo thumbnail, title, photographer name, and a brief description.
*/
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

export default function PhotoCard({ photo }) {
    return (
        <React.Fragment>
            <Card variant='outlined'
                sx={{
                    width: "50%",
                    height: '80vh',
                    margin: "20px auto",
                    borderRadius: 4,
                    boxShadow: 2,
                    transition: "transform 0.2s",
                    display: "flex",
                    flexDirection: "column"

                }}>
                <CardMedia component="img"
                    image={photo.download_url}
                    sx={{
                        height: "70%",
                        objectFit: "cover"
                    }}>
                </CardMedia>


                <CardContent sx={{ textAlign: "left", backgroundColor: "#fafafa", height: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant='h4' sx={{ textAlign: "center", color: "text.primary" }}>
                        Title: {"Empty title"}
                    </Typography>
                    <Typography gutterBottom variant='h5' sx={{ textAlign: "left", color: "text.primary" }}>
                        Description: {"No description available."}
                    </Typography>

                    <Typography variant='body2' color="text.secondary" sx={{ mb: 1, textAlign:"right" , fontStyle: "italic" }}>
                        Photo by {photo.author}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
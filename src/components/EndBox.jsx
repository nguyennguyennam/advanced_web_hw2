/*
    This class will display an error message when there is an error fetching images.
*/

import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

export default function EndImages() {
    return (
        <Alert severity="info">
            <AlertTitle>End Of images</AlertTitle> 
        </Alert>
    )
}
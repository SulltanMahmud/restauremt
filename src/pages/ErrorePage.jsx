
import React from 'react'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Grid from "@mui/material/Grid";

export default function ErrorePage() {
    return (
        <main style={{ marginTop: 200, textAlign: "center", fontSize: 20, fontWeight: 'bold', color: 'red' }}>

            <Grid >
                <SentimentVeryDissatisfiedIcon />
            </Grid>
            {/* <Avatar alt="Admin Image" src={<SentimentVeryDissatisfiedIcon />} /> */}
            {/* <SentimentVeryDissatisfiedIcon/> */}
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for could not be found.</p>
        </main>
    )
}

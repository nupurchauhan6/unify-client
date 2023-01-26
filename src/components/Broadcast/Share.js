import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import cover from './cover.svg';
import { useRef, useState } from 'react'
import axios from 'axios';
import Papa from 'papaparse';

export default function Share() {
    const fileInputField = useRef(null);
    const [fileName, setFileName] = useState("");
    const [emailIds, setEmailIds] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const request = {
            message: data.get('message'),
            emailIds: emailIds
        }
        console.log(request);
        axios.post('https://unify-s7jg.onrender.com/files/share', request, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            alert("Message sent successfully!");
        }).catch(err => {
            alert(err)
        });
    };

    const handleFileUpload = event => {
        setFileName(event.target.files[0].name);
        Papa.parse(event.target.files[0], {
            skipEmptyLines: true,
            complete: function (results) {
                let emailIds = []
                for(let id of results.data) {
                    emailIds.push(id.toString())
                }
                setEmailIds(emailIds);
            },
        });
        alert("File uploaded successfully");
    };

    return (
        <div>
            <Grid container component="main" sx={{ height: '50vh', pl: "10em", pr: "10em", marginTop: "50px" }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${cover})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} style={{ border: "none" }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1 }}>
                            <EmailIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Broadcast a Message
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="message"
                                label="Enter your message"
                                multiline
                                name="message"
                                autoFocus
                            />
                            <input
                                id="uploadFile"
                                name="uploadFile"
                                type="file"
                                margin="normal"
                                accept=".csv"
                                ref={fileInputField}
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                                multiple={false}
                            />
                            <Button onClick={() => fileInputField.current.click()}>
                                Upload File
                            </Button> <span>{fileName}</span>
                            <br />
                            <Typography variant="caption" sx={{ ml: 1 }}>* Can only accept .csv file.</Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div >
    );
}
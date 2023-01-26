import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function Create() {

  const authedUser = useSelector(state => state.authedUser);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const request = {
      userId: authedUser._id,
      title: data.get('title'),
      description: data.get('description'),
      additionalDetails: data.get('roadmap'),
      startTime: data.get('startTime'),
      endTime: data.get('endTime'),
      meetingLink: data.get('link'),
      meetingDetails: data.get('details'),
      registeredUsers: []
    }
    axios.post("https://unify-s7jg.onrender.com/events/", request)
      .then((response) => {
        alert("Meeting created successfully. Check your mail for confirmation.")
        let eventId = response.data._id;
        let userId = authedUser._id;
        fetch(`https://unify-s7jg.onrender.com/users/organize/${eventId}/${userId}`)
          .then((response) => {
            console.log(response.data);
          }).catch((error) => {
            alert(error);
          });
        navigate("/browse");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} component="form" noValidate onSubmit={handleSubmit}>
        <Typography component="h3" variant="h4" align="center">
          Create a New Meeting
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="title"
              name="title"
              label="Topic"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="roadmap"
              name="roadmap"
              label="Agenda/Roadmap/Additional Details"
              fullWidth
              multiline
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="startTime"
              name="startTime"
              label="Start Time"
              type="datetime-local"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="endTime"
              name="endTime"
              label="End Time"
              type="datetime-local"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="link"
              name="link"
              label="Meeting Link"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="details"
              name="details"
              label="Additional Meeting Details"
              multiline
              helperText="Please include any passcode or any other information needed"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

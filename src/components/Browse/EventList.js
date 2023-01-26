import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { receiveEvents } from '../../actions/events';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("Subscribe")

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const response = await fetch('https://unify-s7jg.onrender.com/events');
    const data = await response.json();
    setEvents(data);
    dispatch(receiveEvents(data));
  }

  const handleButtonClick = (event) => {
    console.log(event);
  }

  return (
    <div style={{ backgroundColor: "#E8F0FF" }}>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 1, pb: 1 }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="primary"
          gutterBottom
        >
          Upcoming Meetings
        </Typography>
      </Container>
      <Container component="main">
        <Grid container spacing={3} alignItems="flex-end">
          {events.map((event) => (
            <Grid
              item
              key={event._id}
              xs={12}
              sm={6}
              md={4}
            >
              <Card style={{
                backgroundColor: "#FFFFFF",
                display: 'block',
                width: '30vw',
                transitionDuration: '0.3s',
                height: 'auto',
                minHeight: '25vw',
                maxHeight: '20vw',
                overflow: 'scroll'
              }} sx={{ maxWidth: 345, minWidth: 345 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'baseline',
                      mb: 1
                    }}
                  >
                    <Typography component="h6" variant="h6" style={{ fontWeight: 'bold' }}>
                      {event.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    align="left"
                    color="rgb(101, 112, 124)"
                  >
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={handleButtonClick} size="small">
                    {buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          mt: 8,
          py: [3, 6],
        }}
      >
      </Container>
    </div>
  );
}
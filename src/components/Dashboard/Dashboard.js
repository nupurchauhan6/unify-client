import * as React from 'react';
import Grid from '@mui/material/Grid';
import cover from './cover.svg';
import { useSelector } from 'react-redux';
import UpcomingEvents from '../Browse/UpcomingEvents';

export default function Dashboard() {
  const authedUser = useSelector(state => state.authedUser);

  return (
    <Grid>
      <Grid container sx={{
        height: '50vh', pl: "10em", pr: "10em",
        backgroundColor: "#E8F0FF",
        borderRadius: "130px 0 130px 0"
      }}>
        <Grid item xs={12} sm={8} md={6} sx={{
          margin: "auto",
          width: "50%",
          fontSize: "xx-large"
        }}>
          <h1>{authedUser.firstName} {authedUser.lastName}</h1>
          <p>@{authedUser.userId}</p>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${cover})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
      <Grid sx={{
        marginTop: "10px",
      }}>
        <UpcomingEvents />
      </Grid>
    </Grid>
  );
}

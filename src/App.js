import SignInSide from "./components/SignIn/SignIn";
import React from "react";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Create from "./components/Create/Create";
import EventList from "./components/Browse/EventList";
import Share from "./components/Broadcast/Share";
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import UpcomingEvents from "./components/Browse/UpcomingEvents";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(49, 104, 229)"
    }
  },
  typography: {
    fontSize: 15,
    fontFamily: [
      'Studio-Feixen-Sans,Arial',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  const authedUser = useSelector(state => state.authedUser);

  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        {!authedUser ? <>
          <Routes>
            <Route path="/" element={<SignInSide />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<SignInSide />} />
          </Routes>
        </> : <>
          <Header />
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/browse" element={<EventList />} />
            <Route path="/broadcast" element={<Share />} />
            <Route path="/upcomingevents" element={<UpcomingEvents />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </>}
      </React.StrictMode>
    </ThemeProvider>
  );
}

export default App;

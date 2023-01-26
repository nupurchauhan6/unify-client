import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Create an Event', url: '/create' },
  { title: 'Browse', url: '/browse' },
  { title: 'Broadcast', url: '/broadcast' },
  { title: 'Scheduled Events', url: '/upcomingevents' }
];

function Header() {

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h5"
          variant="h5"
          color="inherit"
          noWrap
        >
          <strong style={{ color: '#3168E5' }}>U</strong>nify
        </Typography>

        <div style={{ marginLeft: "auto", "marginRight": 0 }}>
          {sections.map((section) => (
            <Link
              color="inherit"
              key={section.title}
              variant="body2"
              to={section.url}
              style={{
                margin: "1rem",
                textDecoration: "none",
                color: 'black',
                fontWeight: "5rem",
              }}
            >
              {section.title}
            </Link>
          ))}
        </div>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;

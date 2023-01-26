import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UpcomingEvents() {
    const authedUser = useSelector(state => state.authedUser);
    const [value, setValue] = React.useState(0);
    const [subscribedEvents, setSubscribedEvents] = useState([]);
    const [organizedEvents, setOrganizedEvents] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetchOrganizedEvents();
        fetchSubscribedEvents();
    }, []);

    async function fetchOrganizedEvents() {
        const response = await fetch('https://unify-s7jg.onrender.com/events/organized/' + authedUser._id);
        const data = await response.json();
        setOrganizedEvents(data);
    }

    async function fetchSubscribedEvents() {
        const response = await fetch('https://unify-s7jg.onrender.com/events/subscribed/' + authedUser._id);
        const data = await response.json();
        setSubscribedEvents(data);
    }

    return (
        <Box sx={{ width: '100%', p: "50px" }}>
            <Box >
                <Tabs textColor="primary" indicatorColor="primary" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Subscribed Events" {...a11yProps(0)} />
                    <Tab label="Events Organized" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container spacing={3} alignItems="flex-end">
                    {subscribedEvents.map((event) => (
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
                                minHeight: '18vw',
                                maxHeight: '18vw',
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
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={3} alignItems="flex-end">
                    {organizedEvents.map((event) => (
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
                                minHeight: '18vw',
                                maxHeight: '18vw',
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
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </TabPanel>
        </Box>
    );
}
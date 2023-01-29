import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import cover from './cover.svg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setAuthedUser } from '../../actions/authedUser';
import jwt_decode from "jwt-decode";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SignInSide() {
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        handleLoader(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const request = {
            "username": data.get('email'),
            "password": data.get('password'),
        };
        console.log(request);
        axios.post("https://unify-s7jg.onrender.com/users/login", request, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((response) => {
            var token = response.data.access_token;
            var decoded = jwt_decode(token);
            var obj = JSON.parse(decoded.sub.replace(/'/g, "\""))
            dispatch(setAuthedUser(obj));
            handleLoader(false);
        }).catch((error) => {
            handleLoader(false);
            alert(error.response.data.detail);
        });
    };

    const [open, setOpen] = useState(false);
    const handleLoader = (val) => {
        setOpen(val);
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleLoader}
            >
                <CircularProgress color="inherit" />
                <span style = {{marginLeft: "10px"}}> Loading ...</span>
            </Backdrop>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'error.dark' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={`/signup`} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${cover})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    );
}
import React, { useState } from 'react'
import { Stack } from '@mui/system'
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Axios } from '../app/axiosClient'
import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toggleDarkMode } from '../actions/themeSlice';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Login = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const theme = useSelector((state) => state.theme);
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleLogin = async () => {
        try {
            setisLoading(true);
            const response = await Axios.post('/login', { email: form?.email, password: form?.password?.toString() });
            dispatch(login(response.data));
            setisLoading(false);
            return navigate("/");;
        } catch (err) {
            setisLoading(false);
            console.log({ err });
            const { status } = err?.response;
            if (status == 422) {
                const { errors } = err.response.data;
                setErrors(errors);
                console.log({ errors });
            }
        }
    }

    const renderErrors = (key) => {
        return errors[key] && errors[key].map((error) => {
            return (
                <Typography color={'red'} key={error.toString()}>{error}</Typography>
            )
        });
    }

    const renderSubmitButton = () => {
        if (!isLoading) {
            return (
                <Button onClick={handleLogin} disableElevation sx={style.buttonColor} variant="contained" color='success'   >
                    <Typography fontSize={19} fontWeight="bold">
                        ورود
                    </Typography>
                </Button>
            )
        } else {
            return (
                <Button disabled sx={style.buttonColor} variant="contained"  >
                    <CircularProgress size={24} color="inherit" />
                </Button>
            )
        }
    }

    return (
        <Stack direction={'row'} justifyContent='center' alignItems={'center'} sx={{ ...style.container, background: (theme.isDark) ? 'black' : "#ebebeb" }}>
            <Stack direction={'column'} justifyContent='center' alignItems={'center'} >
                <Grow in={true} timeout={1500}>
                    <Paper elevation={3} sx={style.box}>
                        <Stack direction={'column'} alignItems='center' sx={style.box}>
                            <AccountCircleIcon sx={{ width: '6rem', height: '6rem' }} color="info" />
                            <Typography sx={{ marginTop: '1rem' }} fontSize={24} fontWeight={"bold"}>ورود به سامانه</Typography>
                            <TextField error={errors.hasOwnProperty('email')} name="email" required onChange={handleChange} fullWidth dir={'rtl'} id="standard-basic" label="ایمیل" variant="standard" />
                            <Stack direction={'column'} style={style.error} alignSelf='start'>
                                {renderErrors('email')}
                            </Stack >
                            <TextField error={errors.hasOwnProperty('password')} name="password" required onChange={handleChange} type={'password'} fullWidth dir={'rtl'} id="standard-basic" label="پسورد" variant="standard" />
                            <Stack direction={'column'} style={style.error} alignSelf='start'>
                                {renderErrors('password')}
                            </Stack >
                            <Stack sx={style.buttonControll} direction={'column'} justifyContent={'center'}>
                                {renderSubmitButton()}
                                <Link style={style.mr} to={'/register'}>
                                    <Typography fontSize={18} fontWeight={'bold'} variant="text" >ثبت نام</Typography>
                                </Link>
                            </Stack>
                        </Stack>
                        <Stack width={"100vw"} justifyContent='center' direction={'row'}>
                            {
                                (theme.isDark) ?
                                    <IconButton sx={{ width: '4rem', height: '4rem' }} onClick={() => dispatch(toggleDarkMode())}>
                                        <LightModeIcon color='warning' />
                                    </IconButton>
                                    :
                                    <IconButton sx={{ width: '4rem', height: '4rem' }} onClick={() => dispatch(toggleDarkMode())}>
                                        <DarkModeIcon color='white' />
                                    </IconButton>
                            }
                        </Stack>
                    </Paper>
                </Grow>
            </Stack>
        </Stack>
    )
}

const style = {
    container: {
        minWidth: '100vw',
        minHeight: '100vh',
        background: '#ebebeb',
    },
    box: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '40vw',
        minHeight: '24rem',
        padding: '2rem'
    },
    buttonControll: {
        marginTop: '2rem',
        width: '45%',
        margin: 'auto'
    },
    error: {
        marginTop: '1rem',
        marginBottom: '1rem'
    },
    mr: {
        width: '100%',
        marginTop: '2rem',
        textAlign: 'center'
    },
    buttonColor: {
        width: '100%',
    }
}

export default Login
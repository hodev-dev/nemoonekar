import React, { useState } from 'react'
import { Stack } from '@mui/system'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import { useDispatch } from 'react-redux';
import { login, logout } from '../actions/authSlice';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Axios } from '../app/axiosClient'
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinearProgress from '@mui/material/LinearProgress';
import { toggleDarkMode } from '../actions/themeSlice';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Register = () => {
    const [form, setForm] = useState({ password: '' });
    const [isLoading, setisLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [passwordStregth, setPasswordStregth] = useState({ color: 'error', value: 'ضعیف' });
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const theme = useSelector((state) => state.theme);

    React.useEffect(() => {
        switchPasswrodLabel(form.password);
    }, [form.password])

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleRegister = async () => {
        try {
            setisLoading(true);
            const response = await Axios.post('/register', {
                name: form?.name,
                email: form?.email,
                password: form?.password?.toString(),
                repassword: form?.repassword
            });
            setisLoading(false);
            return navigate("/login");;
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

    const switchPasswrodLabel = (password) => {
        if (password && password.length <= 3 || password.length == 0) {
            setPasswordStregth({ color: 'error', value: 'ضعیف', percent: 30 })
        }

        else if (password && password.length >= 4 || password.length <= 5) {
            setPasswordStregth({ color: 'warning', value: 'متوسط', percent: 60 })
        }

        if (password && password.length >= 6) {
            setPasswordStregth({ color: 'success', value: 'عالی', percent: 100 })
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
                <Button onClick={handleRegister} sx={style.buttonColor} variant="contained" color="info" disableElevation>
                    <Typography fontSize={19} fontWeight="bold">ثبت نام</Typography>
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
            <Grow in={true} timeout={1500}>
                <Stack direction={'column'} justifyContent='center' alignItems={'center'} >
                    <Paper elevation={3} sx={style.box}>
                        <Stack direction={'column'} alignItems='center' sx={style.box}>
                            <AccountCircleIcon sx={{ width: '6rem', height: '6rem' }} color="info" />
                            <Typography sx={{ marginTop: '1rem' }} fontSize={24} fontWeight={"bold"}>ثبت نام</Typography>
                            <TextField error={errors.hasOwnProperty('name')} name="name" required onChange={handleChange} fullWidth dir={'rtl'} id="standard-basic" label="نام" variant="standard" />
                            <Stack direction={'column'} style={style.error} alignSelf='start'>
                                {renderErrors('name')}
                            </Stack >
                            <TextField error={errors.hasOwnProperty('email')} name="email" required onChange={handleChange} fullWidth dir={'rtl'} id="standard-basic" label="ایمیل" variant="standard" />
                            <Stack direction={'column'} style={style.error} alignSelf='start'>
                                {renderErrors('email')}
                            </Stack >
                            <TextField error={errors.hasOwnProperty('password')} name="password" required onChange={handleChange} type={'password'} fullWidth dir={'rtl'} id="standard-basic" label="رمز عبور" variant="standard" />
                            <Stack direction={'column'} style={style.error} alignSelf='start'>
                                {renderErrors('password')}
                            </Stack >
                            <Box sx={{ width: '100%', marginTop: -3 }}>
                                <LinearProgress sx={{ height: '1rem' }} color={passwordStregth.color} variant="buffer" value={passwordStregth.percent} />
                            </Box>
                            <Stack sx={{ marginTop: '1rem' }}>
                                <Typography size={19} fontWeight="bold">{passwordStregth.value}</Typography>
                            </Stack>
                            <TextField error={errors.hasOwnProperty('repassword')} name="repassword" required onChange={handleChange} type={'password'} fullWidth dir={'rtl'} id="standard-basic" label="تکرار رمز عبور" variant="standard" />
                            <Stack direction={'column'} style={style.error} alignSelf='start'>
                                {renderErrors('repassword')}
                            </Stack >
                            <Stack sx={style.buttonControll} direction={'column'} justifyContent={'center'}>
                                {renderSubmitButton()}
                                <Link style={style.mr} to={'/login'}>
                                    <Button variant="text" >
                                        <Typography fontSize={19} fontWeight="bold">
                                            ورود
                                        </Typography>
                                    </Button>
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
                </Stack>
            </Grow >
        </Stack >
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
        minHeight: '28rem',
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
        marginTop: '2rem'
    }
}

export default Register
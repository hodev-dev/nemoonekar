import React, { useState } from 'react'
import { Stack } from '@mui/system'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { login, logout } from '../actions/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Axios } from '../app/axiosClient'
import { Typography } from '@mui/material';

const Login = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleLogin = async () => {
        try {
            const response = await Axios.post('/login', { email: form?.email, password: form?.password?.toString() });
            dispatch(login(response.data));
            return navigate("/");;
        } catch (err) {
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

    return (
        <Stack direction={'row'} justifyContent='center' alignItems={'center'} sx={style.container}>
            <Stack direction={'column'} justifyContent='center' alignItems={'center'} >
                <Paper elevation={3} sx={style.box}>
                    <Stack direction={'column'} alignItems='center' sx={style.box}>
                        <Typography fontSize={'2rem'}>ورود</Typography>
                        <TextField error={errors.hasOwnProperty('email')} name="email" required onChange={handleChange} fullWidth dir={'rtl'} id="standard-basic" label="ایمیل" variant="standard" />
                        <Stack direction={'column'} style={style.error} alignSelf='start'>
                            {renderErrors('email')}
                        </Stack >
                        <TextField error={errors.hasOwnProperty('password')} name="password" required onChange={handleChange} type={'password'} fullWidth dir={'rtl'} id="standard-basic" label="پسورد" variant="standard" />
                        <Stack direction={'column'} style={style.error} alignSelf='start'>
                            {renderErrors('password')}
                        </Stack >
                        <Stack sx={style.buttonControll} direction={'column'} justifyContent={'center'}>
                            <Button onClick={handleLogin} sx={style.buttonColor} variant="contained"  >ورود</Button>
                            <Link style={style.mr} to={'/register'}>
                                <Button variant="text" >ثبت نام</Button>
                            </Link>
                            {/* <Button sx={style.mr} variant="text" >ثبت نام</Button> */}
                            {/* <Button onClick={() => dispatch(login())} sx={style.mr} variant="text" >login</Button>
                            <Button onClick={() => dispatch(logout())} sx={style.mr} variant="text" >logout</Button>
                            <Link to={'/'}>home</Link> */}
                        </Stack>
                    </Stack>
                </Paper>
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
        width: '30vw',
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
        background: 'green',
    }
}

export default Login
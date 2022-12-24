import React from 'react'
import Scafold from '../components/layouts/Scafold'
import { Paper, TextField, Stack, Button } from '@mui/material'
import { Axios } from '../app/axiosClient'
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [form, setForm] = React.useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleAddTicket = async () => {
        try {
            await Axios.post('/api/add_ticket', { title: form?.title, message: form?.message, order: 5 });
            Store.addNotification({
                title: "عملیات موفق",
                message: "تیکت با موفقیت ثبت شد",
                type: "success",
                insert: "left",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            return navigate('/');
        } catch (error) {
            console.log(error);
            Store.addNotification({
                title: "عملیات نا موفق",
                message: "خطا لطفا بعدا امتحان کنید",
                type: "danger",
                insert: "left",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    }

    return (
        <Scafold>
            <Stack >
                <h3>افزودن تیکت</h3>
                <Paper sx={{ width: '40vw', padding: 3 }} elevation={5}>
                    <TextField onChange={handleChange} name="title" required dir={'rtl'} id="standard-basic" label="موضوع" variant="standard" />
                    <TextField onChange={handleChange} name="message" required fullWidth dir={'rtl'} id="standard-basic" label="متن" variant="standard" />
                    <Stack direction={'column'} justifyContent={'center'}>
                        <Button onClick={handleAddTicket} variant="contained" color='secondary' sx={{ marginTop: 5 }} >افزودن</Button>
                    </Stack>
                </Paper>
            </Stack>
        </Scafold>
    )
}

export default Add
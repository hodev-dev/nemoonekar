import React from 'react'
import Scafold from '../components/layouts/Scafold'
import { Paper, TextField, Stack, Button } from '@mui/material'
import { Axios } from '../app/axiosClient'

const Add = () => {
    const [form, setForm] = React.useState({});

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleAddTicket = async () => {
        try {
            await Axios.post('/api/add_ticket', { title: form?.title, message: form?.message, order: 5 });
        } catch (error) {
            console.log(error);
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
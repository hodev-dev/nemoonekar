import React, { useEffect } from 'react'
import Scafold from '../components/layouts/Scafold'
import { Paper, TextField, Stack, Button } from '@mui/material'
import { Axios } from '../app/axiosClient'
import { useSearchParams } from 'react-router-dom'
import Loading from '../components/layouts/Loading'

const Edit = () => {
    const [form, setForm] = React.useState({ title: '', message: '' });
    const [status, setStatus] = React.useState("LOADING");
    const [searchParam] = useSearchParams();

    React.useEffect(() => {
        Axios.post('/api/list_ticket', { id: searchParam.get('id') }).then((response) => {
            setForm(response.data);
            setStatus("IDLE");
        }).catch((err) => {
            console.log(err);
            setStatus("FAILED");
        });

    }, [searchParam.get('id')])

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleEditEticket = async () => {
        try {
            await Axios.post('/api/edit_ticket', { id: searchParam.get('id'), title: form?.title, message: form?.message, order: 5 });
        } catch (error) {
            console.log(error);
        }
    }

    const renderForm = () => {
        if (status === "IDLE") {
            return (
                <Stack >
                    <h3>ویرایش تیکت</h3>
                    <h3> شماره تیکت :{searchParam.get('id')}</h3>
                    <Paper sx={{ width: '40vw', padding: 3 }} elevation={5}>
                        <TextField onChange={handleChange} name="title" focused value={form?.title || ""} required fullWidth dir={'rtl'} id="standard-basic" label="موضوع" variant="standard" />
                        <TextField onChange={handleChange} name="message" focused value={form?.message || ""} required fullWidth dir={'rtl'} id="standard-basic" label="متن" variant="standard" />
                        <Stack direction={'column'} justifyContent={'center'}>
                            <Button onClick={handleEditEticket} variant="contained" color='secondary' sx={{ marginTop: 5 }} >ویرایش</Button>
                        </Stack>
                    </Paper>
                </Stack>
            )
        }
        if (status === "LOADING") {
            return <Loading />
        }
        if (status === 'FAILED') {
            return <h1>FAILED</h1>
        }
    }
    return (
        <Scafold>
            {renderForm()}
        </Scafold>
    )
}

export default Edit
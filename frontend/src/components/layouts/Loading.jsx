import React from 'react'
import Scafold from './Scafold'
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

const Loading = () => {
    return (
        <Stack direction={'column'} justifyContent={'center'} alignItems='center' sx={{ width: '33vw', height: '33vh', margin: 'auto' }}>
            <CircularProgress size={80} color="primary" />
            <Typography mt={5} size={22} fontWeight="bold">در حال دریافت اطلاعات</Typography>
        </Stack>
    )
}

export default Loading
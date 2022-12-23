import * as React from 'react';
import Scafold from '../components/layouts/Scafold';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import { Axios } from '../app/axiosClient';

export default function User() {
    return (
        <Scafold >
            <button onClick={handleRegister}>register</button>
        </Scafold>
    )
}
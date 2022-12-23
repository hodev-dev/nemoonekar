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
import TableWithPaginate from '../components/table/TableWithPaginate';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('جسین', 159, 6.0, 24, 4.0),
    createData('سلام', 237, 9.0, 37, 4.3),
    createData('تست', 262, 16.0, 24, 6.0),
    createData('تست۲', 305, 3.7, 67, 4.3),
    createData('تست۳', 356, 16.0, 49, 3.9),
];

export default function Home() {

    const [tickets, setTickets] = React.useState([]);
    const [ticketStatus, setTicketStatus] = React.useState("LOADING");

    React.useEffect(() => {
        getTickets(`/api/list_tickets?page=${1}`);
    }, [])

    const getTickets = (url) => {
        Axios.get(url).then((response) => {
            console.log(response);
            setTickets(response.data.data);
            setTicketStatus("IDLE");
        }).catch((err) => {
            console.log(err);
            setTicketStatus("FAIL");
        });
    }

    const renderTickets = () => {
        if (ticketStatus === "IDLE") {
            return tickets.length > 0 && tickets.map((ticket, index) => {
                return (
                    <TableRow
                        key={ticket.title}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="left">
                            {index + 1}
                        </TableCell>
                        <TableCell align="left">{ticket.title}</TableCell>
                        <TableCell align="left">{ticket.message}</TableCell>
                        <TableCell align="left">{ticket.created_at}</TableCell>
                        <TableCell align="left">{ticket.updated_at}</TableCell>
                    </TableRow>
                )
            });
        }

        if (ticketStatus === "LOADING") {
            <h1>Loading</h1>
        }
        if (ticketStatus === 'FAIL') {

        }
    }

    return (
        <Scafold >
            <h2 style={{}}>تیکت ها</h2>
            <TableWithPaginate tickets={tickets} />
        </Scafold>
    )
}
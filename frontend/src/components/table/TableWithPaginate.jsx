import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import { Axios } from '../../app/axiosClient'
import TableAction from './TableAction';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';

export default function TableWithPaginate(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [deleteID, setDeleteID] = React.useState(0);
    const navigate = useNavigate();

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.tickets.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClickOpen = (id) => {
        setOpen(true);
        setDeleteID(id);
    };

    const handleClose = () => {
        setOpen(false);
        setDeleteID(0);
    };

    const handleEdit = (_id) => {
        return navigate({
            pathname: '/edit',
            search: createSearchParams({
                id: _id
            }).toString()
        })
    }
    const handleDelete = async () => {
        try {
            const response = await Axios.post('/api/delete_ticket', { id: deleteID });
            props.getTickets('/api/list_tickets');
            setOpen(false);
            Store.addNotification({
                title: "???????????? ????????",
                message: "???????? ???? ???????????? ?????? ????",
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
        } catch (error) {
            console.log(error);
            Store.addNotification({
                title: "???????????? ???? ????????",
                message: "?????? ???????? ???????? ???????????? ????????",
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
        <Paper elevation={5}>
            <TableContainer component={'Paper'} >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                ?????????? ????????
                            </TableCell>
                            <TableCell component="th" scope="row">
                                ??????
                            </TableCell>
                            <TableCell component="th" scope="row">
                                ????????
                            </TableCell>
                            <TableCell component="th" scope="row">
                                ?????????? ??????????
                            </TableCell>
                            <TableCell component="th" scope="row">
                                ????????????
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? props.tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.tickets
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell component="th" scope="row" sx={{ maxWidth: '5vw' }}>
                                    {row.message}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.time}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button onClick={() => handleEdit(row.id)} disableElevation variant="contained" color='warning' sx={{ marginRight: 2 }} startIcon={<ListIcon />}>????????????</Button>
                                    <Button onClick={() => handleClickOpen(row.id)} disableElevation variant="contained" color={"error"} startIcon={<DeleteIcon />}>??????</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={props.tickets.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                labelRowsPerPage='?????????? ???????? ???? ????????'
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': '?????????? ???? ???? ????????',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TableAction}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        ??????
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ?????? ???? ?????? ?????????????? ?????????????? ?????????? ??
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='warning' disableElevation onClick={handleClose}>??????</Button>
                        <Button variant='contained' color='error' disableElevation onClick={handleDelete} autoFocus>
                            ??????
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Paper>
    );
}
import * as React from 'react';
import Scafold from '../components/layouts/Scafold';
import Loading from '../components/layouts/Loading'
import { Axios } from '../app/axiosClient';
import TableWithPaginate from '../components/table/TableWithPaginate';

export default function Home() {

    const [tickets, setTickets] = React.useState([]);
    const [ticketStatus, setTicketStatus] = React.useState("LOADING");

    React.useEffect(() => {
        getTickets(`/api/list_tickets`);
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
            return (
                <TableWithPaginate tickets={tickets} getTickets={getTickets} />
            )
        }
        if (ticketStatus === "LOADING") {
            return <Loading />
        }
        if (ticketStatus === 'FAIL') {
            return <h1>FAIL</h1>
        }
    }

    return (
        <Scafold >
            <h2 style={{}}>تیکت ها</h2>
            {renderTickets()}
        </Scafold>
    )
}
import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../../actions/sidemenuSlice';
import { Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        {...props}
    />
))(({ theme }) => ({
    height: '4rem',
}));

const ListButton = styled((props) => (
    <Link to={props.path} key={props.text}>
        <Button fullWidth {...props}>
            <Typography >{props.text}</Typography>
        </Button>
    </Link>
))(({ theme }) => ({
    color: (theme.palette.mode == 'dark') ? 'white' : 'black',
    display: 'flex',
    justifyContent: 'start',
    height: '3rem',
    fontSize: '18px',
    textAlign: 'right',
}));

const ListButtonActive = styled((props) => (
    <Link style={{ background: '#03a9f4', color: 'auto' }} to={props.path} key={props.id}>
        <Button type='contained' color='primary' fullWidth {...props}>
            <Typography >{props.text}</Typography>
        </Button>
    </Link>
))(({ theme }) => ({
    display: 'flex',
    justifyContent: 'start',
    height: '3rem',
    fontSize: '18px',
    textAlign: 'right',
    color: (theme.palette.mode == 'dark') ? 'black' : 'white',
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
}));

export default function SideBarItems() {
    const sidemenu = useSelector((state) => state.sidemenu.collection);
    const location = useLocation();
    const dispatch = useDispatch();

    const findTarget = (id) => {
        return sidemenu.find((item) => item.id == id)?.isActive;
    }

    const handleSidebar = ({ event, id }) => {
        dispatch(toggleMenu({ id: id }));
    }

    const renderSidebar = () => {
        return sidemenu.map((menu) => {
            return (
                <>
                    <Accordion key={menu.id} expanded={findTarget(menu.id)} dir={'rtl'}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={(event) => handleSidebar({ id: menu.id })} aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>{menu.title}</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails >
                            <Stack direction={'column'}>
                                {renderChild(menu)}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </>

            )
        });
    }

    const renderChild = (menu) => {
        return menu.children.map((child) => {
            if (location.pathname == child.path) {
                return (
                    <>
                        <ListButtonActive key={child.id} {...location} path={child.path} text={child.title} />
                        <Divider />
                    </>
                )
            }
            return (
                <>
                    <ListButton key={child.path} path={child.path} text={child.title} />
                </>
            )
        });
    }

    return (
        <Stack flex={1} direction={'column'} >
            <Paper >
                {renderSidebar()}
            </Paper>
        </Stack >
    );
}
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
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../../actions/sidemenuSlice';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0.5px solid #03045E`,
    background: '#03045E',
    color: 'white',
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        {...props}
    />
))(({ theme }) => ({
    background: '#03045E',
    height: '4rem',
}));

const ListButton = styled((props) => (
    <Link to={props.path} key={props.text}>
        <Button fullWidth {...props}>
            {props.text}
        </Button>
    </Link>
))(({ theme }) => ({
    display: 'flex',
    justifyContent: 'start',
    background: '#010226',
    color: 'white',
    height: '3rem',
    fontSize: '18px',
    textAlign: 'right',
    ":hover": {
        background: '#0e7490'
    }
}));

const ListButtonActive = styled((props) => (
    <Link to={props.path} key={props.id}>
        <Button fullWidth {...props}>
            {props.text}
        </Button>
    </Link>
))(({ theme }) => ({
    display: 'flex',
    justifyContent: 'start',
    background: '#0e7490',
    color: 'white',
    height: '3rem',
    fontSize: '18px',
    textAlign: 'right',
    ":hover": {
        background: '#0e7490'
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    background: "#1e293b"
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
                <Accordion key={menu.id} expanded={findTarget(menu.id)} dir={'rtl'}>
                    <AccordionSummary onClick={(event) => handleSidebar({ id: menu.id })} aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>{menu.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Stack direction={'column'}>
                            {renderChild(menu)}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            )
        });
    }

    const renderChild = (menu) => {
        return menu.children.map((child) => {
            if (location.pathname == child.path) {
                return <ListButtonActive key={child.id} {...location} path={child.path} text={child.title} />
            }
            return <ListButton key={child.path} path={child.path} text={child.title} />
        });
    }

    return (
        <Stack flex={1} direction={'column'} >
            {renderSidebar()}
        </Stack >
    );
}
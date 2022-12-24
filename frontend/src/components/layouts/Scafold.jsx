import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SideBarItems from '../sidebar/SideBarItems';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../actions/sidebarSilice';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import { Collapse, Slide } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Axios } from '../../app/axiosClient';
import { logout } from '../../actions/authSlice';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { toggleDarkMode } from '../../actions/themeSlice'

export default function Scafold({ children }) {
    const sidebar = useSelector((state) => state.sidebar);
    const theme = useSelector((state) => state.theme);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const response = await Axios.get('/logout');
            dispatch(logout());
            return navigate('/login');
        } catch (error) {
            console.log({ error });
        }
    }

    const sidebarItemsMemo = React.useCallback(() => {
        return <SideBarItems />
    }, []);

    return (
        <Paper>
            <CssBaseline />
            <Stack direction="row" style={{ width: '100vw', minHeight: '100vh', }} minHeight={"100vh"}>
                <Collapse orientation="horizontal" in={sidebar.show}>
                    <Stack color={"palette.background.default"} direction="row" justifyContent={'start'} style={{ display: (sidebar.show) ? 'flex' : 'none', width: '20vw', minHeight: '100vh' }}>
                        {sidebar.show ? sidebarItemsMemo() : null}
                    </Stack>
                </Collapse>
                <Slide direction='bottom' in={true} timeout={400}>
                    <Stack direction="column" style={{ width: (sidebar.show) ? '80vw' : '100vw' }} dir={'rtl'}>
                        <AppBar position="static" >
                            <Toolbar variant='regular'>
                                <IconButton
                                    onClick={() => dispatch(toggleSidebar({ prevState: sidebar.show }))}
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    پنل مدریت
                                </Typography>
                                {
                                    (theme.isDark) ?
                                        <IconButton onClick={() => dispatch(toggleDarkMode())}>
                                            <LightModeIcon color='warning' />
                                        </IconButton>
                                        :
                                        <IconButton onClick={() => dispatch(toggleDarkMode())}>
                                            <DarkModeIcon color='white' />
                                        </IconButton>
                                }
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <IconButton
                                                {...bindTrigger(popupState)}
                                                size="large"
                                                edge="end"
                                                color="inherit"
                                                aria-label="menu"
                                                sx={{ mr: -2 }}
                                            >
                                                <AccountCircleIcon />
                                            </IconButton>
                                            <Stack direction={'column'} sx={{ marginRight: '2rem', marginLeft: '1rem', cursor: 'pointer' }}>
                                                {auth?.user?.name}
                                            </Stack>
                                            <Menu {...bindMenu(popupState)} >
                                                <MenuItem onClick={() => popupState.close()}>اطلاعات کاربری</MenuItem>
                                                <MenuItem onClick={() => popupState.close()}>اطلاعات حساب</MenuItem>
                                                <MenuItem sx={{ color: 'red' }} onClick={handleLogOut}>خروج</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </Toolbar>
                        </AppBar>
                        <Stack sx={{ padding: 2 }}>
                            {children}
                        </Stack>
                    </Stack>
                </Slide>
            </Stack>
        </Paper >
    );
}


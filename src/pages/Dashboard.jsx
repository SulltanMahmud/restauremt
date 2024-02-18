import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import TableBarIcon from '@mui/icons-material/TableBar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoggedinUserInfo from '../components/userinfo/LoggedinUserInfo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../pages/Dashboard.css';
import UseLoader from '../components/loader/UseLoader.jsx';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [loader, showLoader, hideLoader] = UseLoader();
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    const logout = () => {
        showLoader();
        localStorage.removeItem("isAuth");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        const navigate = useNavigate();
        hideLoader();
        navigate("/login");

    };

  

    return (

        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} >
                    <Toolbar sx={{background: '#CC080B'}}>

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />


                        </IconButton>

                        <span className='appBarTitle'>
                            BSS RESTAURANT
                        </span>

                        <Button endIcon={<AccountCircleIcon />} style={{ color: 'white', marginLeft: "auto" }}>
                            Profile
                        </Button>
                    </Toolbar>

                </AppBar>


                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                    <LoggedinUserInfo />
                        
                        {/* <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton> */}
                    </DrawerHeader>
                    <Divider />
                    {/* <LoggedinUserInfo />
                    <Divider /> */}
                    <List>
                        <Link to={''}>
                            <ListItem disablePadding>

                                <ListItemButton >
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Employee List" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={'table-list'}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TableBarIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Table List" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={'food-list'}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FastfoodIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Food List" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={'order-list'}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LocalMallIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Oder Food" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={'all-orders-list'}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FormatListBulletedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="All Orders" />
                                </ListItemButton>
                            </ListItem>
                        </Link>

                        <Link onClick={logout}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Button variant="outlined" align="center" startIcon={<ExitToAppIcon />}>
                                        Logout
                                    </Button>
                                    {/* <ListItemIcon>
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Log Out" /> */}
                                </ListItemButton>

                            </ListItem>
                        </Link>

                    </List>

                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <Outlet />
                </Main>
            </Box>
            {loader}
        </>
    );
}
import * as React from 'react';
import List from '@mui/material/List';
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
import { Link } from 'react-router-dom';


export default function DrawerListItems() {
    const count = 0;

    const logout = () => {

        localStorage.removeItem("isAuth");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        Swal.fire({
            icon: "success",
            title: "Logout Successful",
            text: "",
        });
        window.location.reload();

    };
    return (
        <>
            <List>
                <Link to={'employee-list'} onClick={() => count = 1}>
                    <ListItem disablePadding>

                        <ListItemButton >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Employee List" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={'table-list'} onClick={() => count = 1}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TableBarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Table List" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={'food-list'} onClick={() => count = 1}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText primary="Food List" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={'order-list'} onClick={() => count = 1}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalMallIcon />
                            </ListItemIcon>
                            <ListItemText primary="Oder Food" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={'all-orders-list'} onClick={() => count = 1}>
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
            {localStorage.setItem("count", count)}
        </>

    )
}

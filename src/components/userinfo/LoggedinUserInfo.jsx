import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AdminPictrure from '../../assets/img/admin.jpg';


export default function LoggedinUserInfo() {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Admin Image" src={AdminPictrure} />
                </ListItemAvatar>
                <ListItemText primary="Admin" secondary="admin@mail.com" />
            </ListItem>

        </List>
    );
}
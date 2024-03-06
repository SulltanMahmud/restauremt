import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Grid } from '@mui/material';
import { Card, CardContent, Typography, Container, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import '../styles/CommonStyle.css';
import '../styles/AllOrderListStyle.css';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DefaultAdminImage from '../assets/img/defaultImg.png'
import UseLoader from './loader/UseLoader';
import ApiCall from './apiCollection/ApiCall';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Scrollbar from 'react-scrollbars-custom';


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];


function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}


export default function AllOrdersList() {
    const [rows, setRows] = useState([]);
    const [loader, showLoader, hideLoader] = UseLoader();

    console.log(rows);

    useEffect(() => {

        const fetchData = async () => {
            showLoader();
            try {
                const response = await axios.get(`${ApiCall.baseUrl}Order/datatable`);
                setRows(response.data.data);


                hideLoader();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    return (
        <>
            <Paper className='mainPaperStyle' >
                <div className='page-top'>
                    <div>
                        <span className='under-line page-title'>All Orders</span>
                    </div>
                    <div>
                        {/* Dropdown Here */}
                    </div>
                </div>
                <div className="mainOrderCardContainer" style={{ display: "flex", backgroundColor: 'none !important' }}>

                    {(
                        rows.map((row, rowIndex) => (
                            <Grid key={rowIndex} sx={{ width: "33%", background: "white", marginRight: "30px", padding: "20px", borderRadius: "10px", boxShadow: "#0000004d 0 4px 12px" }}>
                                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                    <Grid item xs={6}>
                                        <Grid>
                                            <Typography className='isoDateStyle'>{row?.orderNumber}</Typography>
                                            <Typography className='DateTextStyle'>{row?.orderTime}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <IconButton aria-label="delete" className='btnCustomStyle'>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </div>

                                <Grid item xs={12} sx={{ height: "200px", overflowY: "scroll", borderBottom: "1px solid black", scrollbarWidth: "thin" }}>
                                    {(
                                        row.orderItems.map((item, itemIndex) => (
                                            <div className='customListItem' key={itemIndex} >
                                                <ListItemAvatar sx={{ width: "50px" }}>
                                                    <Avatar src={!item.food?.image ? DefaultAdminImage : `${ApiCall.getFoodImage}${item?.food?.image}`} alt='Image' />
                                                </ListItemAvatar>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div style={{ width: "180px" }}>
                                                        <Typography className='foodNameTextStyle'>{item?.food?.name}</Typography>
                                                        <Typography className='foodPriceTextStyle'>{item?.totalPrice}৳</Typography>
                                                    </div>
                                                    <Typography className='foodQtyTextStyle'>Qty: {item?.quantity}</Typography>

                                                </div>

                                            </div>
                                        ))
                                    )}
                                </Grid>
                                <div className='itemInfoStyle'>
                                    <Grid item xs={6}>
                                        <Typography className='foodQtyTextStyle'>Total Item: <span style={{ fontWeight: 'bold' }}>{row?.orderItems.length}</span></Typography>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Typography className='foodQtyTextStyle'>Table: <span style={{ fontWeight: 'bold' }}>{row?.table.tableNumber}</span></Typography>
                                    </Grid>
                                </div>
                                <div className='itemTotalInfoStyle' >
                                    <Grid item xs={6}>
                                        <Typography className='foodTotalPrice'>Total: <span style={{ fontWeight: 'bold', color: "#4caf50" }}>{row?.amount}</span></Typography>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <span className='foodStatusStyle'>{row?.orderStatus}</span>
                                        <IconButton aria-label="edit">
                                            <EditNoteIcon className='editButtonStyle' />
                                        </IconButton>
                                    </Grid>
                                </div>

                            </Grid>
                        ))
                    )}



                </div>

            </Paper>
            {loader}
        </>
    );
}

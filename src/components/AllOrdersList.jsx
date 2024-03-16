import * as React from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import { Typography, ListItemAvatar, Avatar, Select, MenuItem } from "@mui/material";
import '../styles/CommonStyle.css';
import '../styles/AllOrderListStyle.css';

import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DefaultAdminImage from '../assets/img/defaultImg.png'
import UseLoader from './loader/UseLoader';
import ApiCall from './apiCollection/ApiCall';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function AllOrdersList() {
    const [rows, setRows] = useState([]);
    const [loader, showLoader, hideLoader] = UseLoader();
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);



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

    const handleDelete = (orderId) => {
        async function removeOrder(orderId) {
            try {
                showLoader();
                const response = await axios.delete(`${ApiCall.baseUrl}Order/delete/${orderId}`);

                if (response.status === 204) {
                    const updateRows = rows.filter(row => row?.id !== orderId)
                    setRows(updateRows);
                }
                hideLoader();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        removeOrder(orderId);
    };

    const handleEditNote = (orderId, orderGender) => {
        setSelectedOrderId(orderId);
        setSelectedOrderStatus(orderGender);
    };

    const handleOrderStatusChange = async (event) => {
        setSelectedOrderStatus(event.target.value);

        showLoader();

        try {

            const response = await axios.post(`${ApiCall.baseUrl}Order/update-status/${orderId}`, selectedOrderStatus);
            if (response.status === 200) {
                navigate("/admin");
                hideLoader();
            }
        } catch (error) {

            
        }
        // Here you can perform any action you want with the selected gender
    };

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
                <Grid container gap={5} className="mainOrderCardContainer">

                    {(

                        rows.map((row, rowIndex) => (
                            <Grid xs={12} md={3.7} xl={3.7} lg={3.7} item key={rowIndex} sx={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "#0000004d 0 4px 12px" }}>
                                <div style={{ display: "flex", justifyContent: 'space-between !important' }}>
                                    <Grid item xs={12}>
                                        <Grid>
                                            <Typography className='isoDateStyle'>{row?.orderNumber}</Typography>
                                            <Typography className='DateTextStyle'>{row?.orderTime}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <IconButton onClick={() => handleDelete(row?.id)} aria-label="delete" className='btnCustomStyle'>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </div>

                                <Grid item sx={{ height: "200px", overflowY: "scroll", borderBottom: "1px solid black", scrollbarWidth: "thin" }}>
                                    {(
                                        row.orderItems.map((item, itemIndex) => (
                                            <div style={{ display: "flex" }} key={itemIndex}>
                                                <div className='customListItem'  >
                                                    <ListItemAvatar sx={{ width: "50px" }}>
                                                        <Avatar src={!item.food?.image ? DefaultAdminImage : `${ApiCall.getFoodImage}${item?.food?.image}`} alt='Image' />
                                                    </ListItemAvatar>

                                                    <div style={{ width: "100%" }}>
                                                        <Typography className='foodNameTextStyle'>{item?.food?.name}</Typography>
                                                        <Typography className='foodPriceTextStyle'>{item?.totalPrice}৳</Typography>
                                                    </div>
                                                </div>
                                                <div style={{ marginLeft: "auto", marginTop: 'auto' }}>
                                                    <Typography className='foodQtyTextStyle'>Qty: {item?.quantity}</Typography>

                                                </div>

                                            </div>

                                        ))
                                    )}
                                </Grid>
                                <div className='itemInfoStyle'>
                                    <Grid item >
                                        <Typography className='foodQtyTextStyle'>Total Item: <span style={{ fontWeight: 'bold' }}>{row?.orderItems.length}</span></Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography className='foodQtyTextStyle'>Table: <span style={{ fontWeight: 'bold' }}>{row?.table.tableNumber}</span></Typography>
                                    </Grid>
                                </div>
                                <div className='itemTotalInfoStyle' >
                                    <Grid item >
                                        <Typography className='foodTotalPrice'>Total: <span style={{ fontWeight: 'bold', color: "#4caf50" }}>{row?.amount}</span></Typography>
                                    </Grid>
                                    {/* <Grid item >
                                        <span className='foodStatusStyle'>{row?.orderStatus}</span>
                                        <IconButton aria-label="edit">
                                            <EditNoteIcon className='editButtonStyle' />
                                        </IconButton>
                                    </Grid> */}
                                    <Grid item  >
                                        {selectedOrderId === row.id ? (
                                            <div style={{ minWidth: "150px", }} >
                                                <Select
                                                    label="Order Status"
                                                    name="orderStatus"
                                                    value={selectedOrderStatus}
                                                    onChange={handleOrderStatusChange}
                                                    fullWidth

                                                >
                                                    <MenuItem value={`0`}>Pending</MenuItem>
                                                    <MenuItem value={`1`}>Confirmed</MenuItem>
                                                    <MenuItem value={`2`}>Preparing</MenuItem>
                                                    <MenuItem value={`3`}>Prepared To Serve</MenuItem>
                                                    <MenuItem value={`4`}>Served</MenuItem>
                                                    <MenuItem value={`5`}>Paid</MenuItem>
                                                </Select>

                                            </div>

                                        ) : (
                                            <>
                                                <span className='foodStatusStyle'>{row?.orderStatus}</span>
                                                <IconButton aria-label="edit" onClick={() => handleEditNote(row.id, row.gender)}>
                                                    <EditNoteIcon className='editButtonStyle' />
                                                </IconButton>
                                            </>
                                        )}
                                    </Grid>
                                </div>

                            </Grid>
                        ))
                    )}



                </Grid>



            </Paper>
            {loader}
        </>
    );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import UseLoader from './loader/UseLoader';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ApiCall from './apiCollection/ApiCall';
import DefaultAdminImage from '../assets/img/defaultImg.png'
import { Link } from 'react-router-dom';


const columns = [
    { id: 'image', label: 'Image', minWidth: 30 },
    { id: 'name', label: 'Name', minWidth: 250 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'discountType', label: 'Discount Type', minWidth: 140 },
    { id: 'discount', label: 'Discount', minWidth: 100 },
    { id: 'discountPrice', label: 'Discount Price', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 80 },
];


export default function FoodList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [loader, showLoader, hideLoader] = UseLoader();

    const addActionButtons = (rowIndex) => (
        <div>
            <IconButton aria-label="edit">
                <EditIcon sx={{color:"green"}} />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDelete(rowIndex)}>
                <DeleteIcon sx={{color:"red"}} />
            </IconButton>
        </div>
    );
    const handleDelete = (foodId) => {
        async function removeFood(foodId) {
            try {
                showLoader();
                const response = await axios.delete(`${ApiCall.baseUrl}Food/delete/${foodId}`);

                if (response.status === 204) {
                    const updateRows = rows.filter(row => row?.id !== foodId)
                    setRows(updateRows);
                }
                hideLoader();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        removeFood(foodId);
    };

    useEffect(() => {
        const fetchData = async () => {
            showLoader();
            try {
                const response = await axios.get(`${ApiCall.baseUrl}Food/datatable?page=1&per_page=100`);
                setRows(response.data.data);
                hideLoader();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>

            <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'transparent', boxShadow: "none" }}>
                <div style={{ backgroundColor: 'white', maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>
                    <TableContainer sx={{ maxHeight: "80%" }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead sx={{ background: "transparent" }}>
                                <TableRow >
                                    <TableCell className='page-title' align="left" colSpan={2}>
                                        <span className='under-line'>All Food List</span>
                                    </TableCell>

                                    <TableCell align="right" colSpan={6}>
                                    <Link to={'/admin/add-food'}>
                                            <Button variant="outlined" sx={{
                                                color: "black",
                                                border: "2px solid #CC080B",
                                                "&:hover": {
                                                    border: "2px solid #CC080B",
                                                    color: 'white',
                                                    backgroundColor: '#CC080B'
                                                },
                                            }}>Add Food</Button>
                                        </Link>
                                    </TableCell>


                                </TableRow>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} style={{ minWidth: column.minWidth, color: "#CC080B", fontWeight: "bold" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead> 

                            <TableBody>
                                {(
                                    rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, rowIndex) => (

                                            <TableRow key={rowIndex} >
                                                <TableCell align="left">
                                                    <ListItemAvatar>
                                                        <Avatar alt="Admin Image" src={ !row?.image ? DefaultAdminImage : `${ApiCall.getFoodImage}${row?.image}`} />
                                                    </ListItemAvatar>
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.price}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.discountType}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.discount}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.discountPrice}
                                                </TableCell>
                                                
                                                <TableCell align="left">
                                                    {addActionButtons(row?.id)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>

            </Paper>
            {loader}
        </>

    );
}



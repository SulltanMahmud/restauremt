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
import ApiCall from './apiCollection/ApiCall';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const columns = [
    { id: 'tableNumber', label: 'Table Number', minWidth: '20%' },
    { id: 'totalSeats', label: 'Total Seats', minWidth: '20%' },
    { id: 'bookingStatus', label: 'Booking Status', minWidth: '20%' },
    { id: 'employees', label: 'Employees', minWidth: '20%' },
    { id: 'action', label: 'Action', minWidth: '20%' },
];


export default function TableList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [loader, showLoader, hideLoader] = UseLoader();

    const addActionButtons = (rowIndex) => (
        <div>
            <IconButton aria-label="delete" onClick={() => handleDelete(rowIndex)}>
                <DeleteIcon sx={{color:"red"}} />
            </IconButton>
        </div>
    );
    const addEmployeesButtons = (rowIndex) => (
        <div>
            <IconButton aria-label="delete" >
                <AddCircleOutlineIcon sx={{color:"green"}}/>
            </IconButton>
        </div>
    );
    const handleDelete = (tableId) => {
        async function removeTable(tableId) {
            try {
                showLoader();
                const response = await axios.delete(`${ApiCall.baseUrl}Table/delete/${tableId}`);

                if (response.status === 204) {
                    const updateRows = rows.filter(row => row?.id !== tableId)
                    setRows(updateRows);
                }
                hideLoader();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        removeTable(tableId);
    };

    useEffect(() => {
        const fetchData = async () => {
            showLoader();
            try {
                const response = await axios.get(`${ApiCall.baseUrl}Table/datatable?page=1&per_page=100`);
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
                                        <span className='under-line'>All Table List</span>
                                    </TableCell>

                                    <TableCell align="right" colSpan={6}>
                                    <Link to={'/admin/add-table'}>
                                            <Button variant="outlined" sx={{
                                                color: "black",
                                                border: "2px solid #CC080B",
                                                "&:hover": {
                                                    border: "2px solid #CC080B",
                                                    color: 'white',
                                                    backgroundColor: '#CC080B'
                                                },
                                            }}>Add Table</Button>
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
                                                    {row?.tableNumber}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.numberOfSeats}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {!row?.isOccupied ? "Available": "Not Available"}
                                                </TableCell>
                                                
                                                <TableCell align="left">
                                                    {addEmployeesButtons(row?.id)}
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




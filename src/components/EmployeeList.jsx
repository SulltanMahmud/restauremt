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
import '../components/EmployeeList.css';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const columns = [
    { id: 'image', label: 'Image', minWidth: 30 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 100 },
    { id: 'joiningDate', label: 'Joining Date', minWidth: 100 },
    { id: 'designation', label: 'Designation', minWidth: 120 },
    { id: 'action', label: 'Action', minWidth: 120 },
];


export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [loader, showLoader, hideLoader] = UseLoader();

    const addActionButtons = (rowIndex) => (
        <div>
            <IconButton aria-label="edit">
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDelete(rowIndex)}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
    const handleDelete = (employeeId) => {
        async function removeEmployee(employeeId) {
            try {
                showLoader();
                const response = await axios.delete(`https://restaurantapi.bssoln.com/api/Employee/delete/${employeeId}`);
             

                if (response.status === 204) {
                    const updateRows = rows.filter(row => row?.id !== employeeId)
                    console.log(updateRows)

                    setRows(updateRows);
                }
                hideLoader();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        removeEmployee(employeeId);
    };

    useEffect(() => {
        const fetchData = async () => {
            showLoader();
            try {
                const response = await axios.get('https://restaurantapi.bssoln.com/api/Employee/datatable?page=1&per_page=10');
               
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
            <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'transparent' }}>
                <div style={{ backgroundColor: 'white', maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: 20, fontWeight: 'bold' }} align="left" colSpan={2}>
                                        All Employees
                                    </TableCell>

                                    <TableCell align="right" colSpan={6}>
                                        <Button variant="outlined">Add Employee</Button>
                                    </TableCell>


                                </TableRow>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
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
                                                        <Avatar alt="Admin Image" src={`https://restaurantapi.bssoln.com/images/user/${row?.user?.image}`} />
                                                    </ListItemAvatar>
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.user?.fullName}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.user?.email}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.user?.phoneNumber}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.user?.dob}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.joinDate}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.designation}
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


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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ApiCall from './apiCollection/ApiCall';
import DefaultAdminImage from '../assets/img/defaultImg.png'
import { Link } from 'react-router-dom';
import '../styles/CommonStyle.css';
import EditNoteIcon from '@mui/icons-material/EditNote';
import StarsIcon from '@mui/icons-material/Stars';
import Swal from 'sweetalert2';

const columns = [
    { id: 'image', label: 'Image', minWidth: 30 },
    { id: 'name', label: 'Name', minWidth: 230 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'joiningDate', label: 'Join Date', minWidth: 100 },
    { id: 'designation', label: 'Designation', minWidth: 120 },
    { id: 'action', label: 'Action', minWidth: 120 },
];

export default function EmployeeList() {

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [loader, showLoader, hideLoader] = UseLoader();
    const [starColor, setStarColor] = useState(false);

    const handleDelete = (employeeId) => {
        async function removeEmployee(employeeId) {
            try {
                showLoader();
                const response = await axios.delete(`${ApiCall.baseUrl}Employee/delete/${employeeId}`);

                if (response.status === 204) {
                    const updateRows = rows.filter(row => row?.id !== employeeId)
                    setRows(updateRows);
                }
                hideLoader();
            } catch (error) {
                setTimeout(() => {
                    hideLoader();
                    Swal.fire({
                        icon: "error",
                        title: "Request Failed",
                        text: "",
                    });
                }, 3000);
            }
        }
        removeEmployee(employeeId);
    };

    useEffect(() => {

        const fetchData = async () => {
            showLoader();
            try {
                const response = await axios.get(`${ApiCall.baseUrl}Employee/datatable?sort=&page=${page + 1}&per_page=${rowsPerPage}`);
                setRows(response.data.data);
                setTotalData(response.data.total);

                hideLoader();
            } catch (error) {
                setTimeout(() => {
                    hideLoader();
                    Swal.fire({
                        icon: "error",
                        title: "Request Failed",
                        text: "",
                    });
                }, 3000);
            }
        };
        fetchData();

    }, [page, rowsPerPage]);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);

    };

    return (
        <>

            <Paper className='mainPaperStyle'>
                <div className='page-top'>
                    <div>
                        <span className='under-line page-title'>All Employee</span>
                    </div>
                    <div>
                        <Link to={'add-employee'}>
                            <Button variant="outlined" className='topButtonStyle'>Add Employee</Button>
                        </Link>
                    </div>
                </div>

                <div className='mainTableContainer'>
                    <TableContainer className='tableContainerStyle'>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead className='textWidth' >
                                <TableRow >
                                    {columns.map((column) => (
                                        <TableCell key={column.id} className={column.id === "image" ? 'tableHeaderText ellipsText imgWidth' : 'tableHeaderText ellipsText textWidth'} style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(
                                    rows.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            <TableCell align="left" className='tableBodyText'>
                                                <ListItemAvatar>
                                                    <Avatar alt="Admin Image" src={!row?.user?.image ? DefaultAdminImage : `${ApiCall.getImage}${row?.user?.image}`} />
                                                </ListItemAvatar>
                                            </TableCell>
                                            <TableCell align="left" className='tableBodyText ' sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }} >
                                                <div className='ellipsText'>{row?.user?.fullName}</div>
                                                <div>
                                                    <IconButton aria-label="star" onClick={() => setStarColor(!starColor)}>
                                                        {starColor ? <StarsIcon style={{ color: "#F9A825" }} /> : <StarsIcon style={{ color: "#BDBDBD" }} />}
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left" className='tableBodyText ellipsText'>
                                                {row?.user?.email}
                                            </TableCell>
                                            <TableCell align="left" className='tableBodyText ellipsText'>
                                                {row?.user?.phoneNumber}
                                            </TableCell>
                                            <TableCell align="left" className='tableBodyText ellipsText'>
                                                {row?.joinDate}
                                            </TableCell>
                                            <TableCell align="left" className='tableBodyText ellipsText'>
                                                {row?.designation}
                                            </TableCell>
                                            <TableCell align="left" className='tableBodyText'>
                                                <div>
                                                    <IconButton aria-label="edit">
                                                        <EditNoteIcon className='editButtonStyle' />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" onClick={() => handleDelete(row?.id)}>
                                                        <DeleteIcon className='deleteButtonStyle' />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100, { value: totalData, label: 'All' }]}
                        component="div"
                        count={totalData}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={"Items per page: "}


                        classes={{
                            input: 'MuiTablePagination-input',
                            select: 'MuiTablePagination-select',
                            selectIcon: 'MuiTablePagination-selectIcon',
                        }}
                    />
                </div>
            </Paper>
            {loader}
        </>
    );
}
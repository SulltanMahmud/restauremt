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
import EditNoteIcon from '@mui/icons-material/EditNote';
import Swal from 'sweetalert2';


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
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [loader, showLoader, hideLoader] = UseLoader();

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
        removeFood(foodId);
    };

    useEffect(() => {
        const fetchData = async () => {
            showLoader();
            try {
                const response = await axios.get(`${ApiCall.baseUrl}Food/datatable?page=${page + 1}&per_page=${rowsPerPage}`);
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
                        <span className='under-line page-title'>All Food List</span>
                    </div>
                    <div>
                        <Link to={'/admin/add-food'}>
                            <Button variant="outlined" className='topButtonStyle'>Add Food</Button>
                        </Link>
                    </div>
                </div>
                <div className='mainTableContainer'>
                    <TableContainer className='tableContainerStyle'>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} className={column.id === "image" ? 'tableHeaderText ellipsText imgWidth' : 'tableHeaderText ellipsText textWidth'} style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(
                                    rows
                                        .map((row, rowIndex) => (
                                            <TableRow key={rowIndex} >

                                                <TableCell align="left" className='tableBodyText'>
                                                    <ListItemAvatar>
                                                        <Avatar alt="Admin Image" src={!row?.image ? DefaultAdminImage : `${ApiCall.getFoodImage}${row?.image}`} />
                                                    </ListItemAvatar>
                                                </TableCell>
                                                <TableCell align="left" className='tableBodyText ellipsText'>
                                                    {row?.name}
                                                </TableCell>
                                                <TableCell align="left" className='tableBodyText ellipsText'>
                                                    {row?.price}
                                                </TableCell>
                                                <TableCell align="left" className='tableBodyText ellipsText'>
                                                    {row?.discountType}
                                                </TableCell>
                                                <TableCell align="left" className='tableBodyText ellipsText'>
                                                    {row?.discount}
                                                </TableCell>
                                                <TableCell align="left" className='tableBodyText ellipsText'>
                                                    {row?.discountPrice}
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



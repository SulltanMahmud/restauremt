import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

const columns = [
    { id: 'image', label: 'Image', minWidth: 30 },
    { id: 'name', label: 'Name', minWidth: 170 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,

        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 100,
        // align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'dateOfBirth',
        label: 'Date of Birth',
        minWidth: 100,
        // align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'joiningDate',
        label: 'Joining Date',
        minWidth: 100,
        // align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'designation',
        label: 'Designation',
        minWidth: 120,
        // align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 120,
        // align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(image, name, email, phone, dateOfBirth, joiningDate, designation, action) {
    
    return { image, name, email, phone, dateOfBirth, joiningDate, designation, action };
}

const rows = [
    createData('img', 'Firose Munna', 'munnafirose@gmail.com', '01956431180', '15/03/2000', '15/01/2024', 'Trainee', 'Delete'),
    
    
];

export default function EmployeeList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 20, fontWeight: 'bold' }} align="left" colSpan={2}>
                                Employee List
                            </TableCell>

                            <TableCell align="right" colSpan={6}>
                                <Button variant="outlined">Add Employee</Button>
                            </TableCell>


                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

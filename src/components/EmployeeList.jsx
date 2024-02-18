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

function createData(image, name, email, phone, dateOfBirth, joiningDate, designation, action) {
    return { image, name, email, phone, dateOfBirth, joiningDate, designation, action };
}

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
                if (response.status === 200) {
                   
                    setRows(prevRows => prevRows.filter(row => row.id !== employeeId));
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
                const newData = response.data.data.map(item => createData(
                    <img src={item.image} alt="Employee" style={{ maxWidth: '50px', maxHeight: '50px' }} />,
                    item.user.fullName,
                    item.user.email,
                    item.user.phoneNumber,
                    item.user.dob,
                    item.joinDate,
                    item.designation,
                    addActionButtons(item.id)
                    
                ));
                hideLoader();
                setRows(newData);
                
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
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                                        <TableRow key={rowIndex}>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align="left">
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
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
            </Paper>
            {loader}
        </>

    );
}





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const columns = [
//   { id: 'image', label: 'Image', minWidth: 100 },
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'email', label: 'Email', minWidth: 170 },
//   { id: 'phone', label: 'Phone', minWidth: 100 },
//   { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 100 },
//   { id: 'joiningDate', label: 'Joining Date', minWidth: 100 },
//   { id: 'designation', label: 'Designation', minWidth: 120 },
//   { id: 'action', label: 'Action', minWidth: 120 },
// ];

// function createData(image, name, email, phone, dateOfBirth, joiningDate, designation) {
//   return { image, name, email, phone, dateOfBirth, joiningDate, designation };
// }

// export default function StickyHeadTable() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('https://restaurantapi.bssoln.com/api/Employee/datatable?page=1&per_page=10');
//         setRows(response.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleDelete = (index) => {
//     // Implement delete logic here
//     // For now, let's just log the index to show which row is being deleted
//     console.log('Deleting row:', index);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">Loading...</TableCell>
//               </TableRow>
//             ) : (
//               rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, rowIndex) => (
//                   <TableRow key={rowIndex}>
//                     {columns.map((column) => {
//                       return (
//                         <TableCell key={column.id} align="left">
//                           {column.id === 'image' ? (
//                             <img src={row[column.id]} alt={row.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
//                           ) : column.id === 'action' ? (
//                             <div>
//                               <IconButton aria-label="edit" onClick={() => console.log('Edit clicked for row:', rowIndex)}>
//                                 <EditIcon />
//                               </IconButton>
//                               <IconButton aria-label="delete" onClick={() => handleDelete(rowIndex)}>
//                                 <DeleteIcon />
//                               </IconButton>
//                             </div>
//                           ) : (
//                             row[column.id]
//                           )}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

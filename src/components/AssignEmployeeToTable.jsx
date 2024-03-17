import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import ApiCall from '../components/apiCollection/ApiCall';
import DefaultAdminImage from '../assets/img/defaultImg.png'
import '../styles/AssignEmployeeToTable.css';
import UseLoader from './loader/UseLoader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const ModalComponent = ({ open, handleClose, tableInfo, Employees }) => {
    const [personName, setPersonName] = useState([]);
    const [assignEmployeeData, setAssignEmployeeData] = useState([]);
    const [loader, showLoader, hideLoader] = UseLoader();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );

        const selectedEmployees = Employees.filter(employee => value.includes(employee.name));
        const modifiedEmployees = selectedEmployees.map(({ name, ...rest }) => ({
            ...rest, tableId: tableInfo.id,
        }));

        setAssignEmployeeData(modifiedEmployees)
    };

    const handleAssign = async () => {
        showLoader();
        try {
            const response = await axios.post(`${ApiCall.baseUrl}EmployeeTable/create-range`, assignEmployeeData);

            if (response.status === 204) {
                const navigate = useNavigate();
                navigate("/admin/table-list");
                hideLoader();
            }
            handleClose();

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

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    className="mainContainer"
                >
                    <div className='titleContainer'>
                        <Typography className='bodyText' sx={{
                            textAlign: 'center', paddingTop: "20px !important"
                        }} id="modal-title" variant="h6" component="h2" gutterBottom>
                            Assign Employee To a Table
                        </Typography>

                    </div>

                    <Box className='bodyContainerBox'>
                        <div className='bodyContainer'>
                            <div className='imageContainer'>
                                <img src={!tableInfo?.image ? DefaultAdminImage : `${ApiCall.getTableImage}${tableInfo?.image}`} alt="Table" style={{ width: 200, }} />
                            </div>

                            <div className='infoContainer'>
                                <Box >
                                    <Typography variant="h6" gutterBottom className='bodyText'>
                                        Table ID: {tableInfo?.tableNumber}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom className='bodyText' style={{paddingBottom: "10px"}}>
                                        Number of Seats: {tableInfo?.numberOfSeats}
                                    </Typography>

                                    <FormControl className='inputFieldStyle'>
                                        <InputLabel id="checkboxLabel">Select Employee</InputLabel>
                                        <Select
                                            labelId="checkboxLabel"
                                            id="multipleCheckbox"
                                            multiple
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Select Employee" />}
                                            renderValue={(selected) => (
                                                <div className='inputTextContainer'>
                                                    {selected.map((name) => (
                                                        <div key={name}>{name}</div>
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {
                                                Employees.map((employee, index) => (
                                                    <MenuItem key={index} value={employee.name}>
                                                        <Checkbox checked={personName.indexOf(employee.name) > -1} />
                                                        <ListItemText primary={employee.name} />
                                                    </MenuItem>))
                                            }

                                        </Select>
                                    </FormControl>

                                </Box>
                            </div>
                        </div>

                    </Box>
                    <Box className="buttonContainer">
                        <Button onClick={handleAssign} variant="contained" className='buttonStyle'>
                            Assign
                        </Button>
                        <Button onClick={handleClose} variant="contained" className='buttonStyle' sx={{ ml: 2 }}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {loader}
        </>
    );
};

export default ModalComponent;

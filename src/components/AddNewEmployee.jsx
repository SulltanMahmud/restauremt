import React, { useState, useRef } from 'react';
import { Grid, TextField, Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';
import ApiCall from '../components/apiCollection/ApiCall';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/CommonStyle.css';
import UseLoader from './loader/UseLoader';


export default function AddNewEmployee() {
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [loader, showLoader, hideLoader] = UseLoader();

  const [formData, setFormData] = useState({
    designation: '',
    joinDate: null,
    email: '',
    phoneNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    dob: null,
    nid: '',
    genderId: '',
    image: '',
    base64: ''
  });

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: value, base64: reader.result });
      };
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date.toISOString() });
  };

  async function handleSubmit(e) {
    showLoader();
    e.preventDefault();
    try {
      const response = await axios.post(`${ApiCall.baseUrl}Employee/create`, formData);
      console.log(response)

      if (response.status === 200) {
        navigate("/admin");
        hideLoader();
      }

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "",
      });
    }
  };

  return (
    <>
      <Paper className='mainPaperStyle'>
        <div className='page-top' style={{ borderBottom: "3px solid  #CC080B" }}>
          <div >
            <span style={{ paddingBottom: 50 }} className=' page-title'>Add Employee</span>
          </div>
        </div>

        <div className='mainTableContainer' style={{ padding: 40 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* First Row */}
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Middle Name"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Image Picker */}
              <Grid item xs={4}>
                <div onClick={handleClick} className='image-picker-container'>
                  {
                    formData.base64 ?
                      <img src={formData.base64} alt="Uploaded" className='image-style' /> :
                      "Add Profile Image"
                  }
                  <input style={{ display: 'none' }} type="file" accept="image/*" name="image" onChange={handleChange} ref={hiddenFileInput} />
                </div>
              </Grid>

              {/* Second Row */}

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Spouse Name"
                  name="spouseName"
                  value={formData.spouseName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Father Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Mother Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Third Row */}

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Fourth Row */}
              <Grid item xs={3} >
                <FormControl fullWidth>
                  <InputLabel >Gender</InputLabel>
                  <Select
                    value={formData.genderId}
                    onChange={handleChange}
                    name="genderId"
                    required
                    label="Gender"
                  >
                    <MenuItem value={`1`}>Male</MenuItem>
                    <MenuItem value={`2`}>Female</MenuItem>
                    <MenuItem value={`3`}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                      label="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={(date) => handleDateChange(date, 'dob')}
                      textField={<TextField fullWidth />}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                      label="Date of Join"
                      value={formData.joinDate}
                      onChange={(date) => handleDateChange(date, 'joinDate')}
                      textField={<TextField fullWidth />}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item xs={3} >
                <TextField
                  fullWidth
                  label="NID"
                  name="nid"
                  value={formData.nid}
                  onChange={handleChange}
                />
              </Grid>
              {/* Fifth Row */}
              <Grid item xs={12} sx={{ paddingBottom: '10px' }}>
                <Button type="submit" fullWidth variant="outlined" className='formSubmitButtonStyle'>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
      {loader}
    </>
  );
};
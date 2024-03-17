import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Paper, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import Swal from 'sweetalert2';
import ApiCall from '../components/apiCollection/ApiCall';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/CommonStyle.css';
import UseLoader from './loader/UseLoader';
import DefaultAdminImage from '../assets/img/defaultImg.png';
import { useMediaQuery } from '@mui/material';

export default function AddNewEmployee() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [loader, showLoader, hideLoader] = UseLoader();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const [formData, setFormData] = useState({
    designation: '',
    joinDate: '',
    email: '',
    phoneNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    dob: '',
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
    else if (name === 'genderId') {
      setFormData({ ...formData, [name]: value });
      setValue('genderId', e.target.value);
    }
    else if (name === 'dob' || name === 'joinDate') {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setFormData({ ...formData, [name]: date.toISOString() });
      }
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = async () => {
    showLoader();
    try {
      const response = await axios.post(`${ApiCall.baseUrl}Employee/create`, formData);
      if (response.status === 200) {
        navigate("/admin");
        hideLoader();
      }
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
      <Paper className='mainPaperStyle'>
        <div className='page-top' style={{ borderBottom: "3px solid  #CC080B", paddingBottom: "10px" }}>
          <div >
            <span style={{ paddingBottom: 50 }} className=' page-title'>Add Employee</span>
          </div>
        </div>

        <div className='mainTableContainer customPadding' >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* First Row */}
              {isMobile && (
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div onClick={handleClick} className='image-picker-container'>
                        {
                          formData.base64 ?
                            <img src={formData.base64} alt="Uploaded" className='image-style' /> : <img src={DefaultAdminImage} alt="Default" className='image-style' />
                        }
                        <input style={{ display: 'none' }} type="file" accept="image/*" name="image" onInput={handleChange} ref={hiddenFileInput} />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12} sm={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      error={!!errors.firstName}
                      helperText={errors.firstName && errors.firstName.message}
                      {...register('firstName', { required: 'First name is required' })}
                      onInput={handleChange}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Middle Name"
                      name="middleName"
                      value={formData.middleName}
                      onInput={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}

                      error={!!errors.lastName}
                      helperText={errors.lastName && errors.lastName.message}
                      {...register('lastName', { required: 'Last name is required' })}
                      onInput={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Image Picker */}
              {!isMobile && (
                <Grid item xs={12} sm={4}>
                  <div onClick={handleClick} className='image-picker-container'>
                    {
                      formData.base64 ?
                        <img src={formData.base64} alt="Uploaded" className='image-style' /> : <img src={DefaultAdminImage} alt="Default" className='image-style' />
                    }
                    <input style={{ display: 'none' }} type="file" accept="image/*" name="image" onInput={handleChange} ref={hiddenFileInput} />
                  </div>
                </Grid>
              )}

              {/* Second Row */}

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Spouse Name"
                  name="spouseName"
                  value={formData.spouseName}

                  error={!!errors.spouseName}
                  helperText={errors.spouseName && errors.spouseName.message}
                  {...register('spouseName', { required: 'Spouse name is required' })}
                  onInput={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Father Name"
                  name="fatherName"
                  value={formData.fatherName}
                  error={!!errors.fatherName}
                  helperText={errors.fatherName && errors.fatherName.message}
                  {...register('fatherName', { required: 'Father name is required' })}
                  onInput={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Mother Name"
                  name="motherName"
                  value={formData.motherName}
                  error={!!errors.motherName}
                  helperText={errors.motherName && errors.motherName.message}
                  {...register('motherName', { required: 'Mother name is required' })}
                  onInput={handleChange}
                />
              </Grid>

              {/* Third Row */}

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  error={!!errors.designation}
                  helperText={errors.designation && errors.designation.message}
                  {...register('designation', { required: 'Designation is required' })}
                  onInput={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                  {...register('email', { required: 'Email is required' })}
                  onInput={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber && errors.phoneNumber.message}
                  {...register('phoneNumber', { required: 'Phone Number is required' })}
                  onInput={handleChange}
                />
              </Grid>
              {/* Fourth Row */}
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth error={!formData.genderId && !!errors.genderId} >

                  <InputLabel >Gender</InputLabel>
                  <Select
                    label="Gender"
                    name="genderId"
                    type='number'
                    value={formData.genderId}
                    {...register('genderId', { required: 'Gender is required' })}
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                    <MenuItem value={3}>Other</MenuItem>
                  </Select>
                  {formData.genderId ? <FormHelperText>{""}</FormHelperText> : <FormHelperText>{errors.genderId?.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  InputLabelProps={{shrink: true}}
                  error={!!errors.dob}
                  helperText={errors.dob && errors.dob.message}
                  {...register('dob', { required: 'Date of Birth is required' })}
                  InputProps={{
                    style: {color: errors.dob ? '#D42F2F' : 'inherit',},
                  }}
                  onInput={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Date of Join"
                  type="date"
                  fullWidth
                  InputLabelProps={{shrink: true,}}
                  InputProps={{
                    style: {color: errors.joinDate ? '#D42F2F' : 'inherit',},
                    className: 'inputOutline'
                  }}
                  error={!!errors.joinDate}
                  helperText={errors.joinDate && errors.joinDate.message}
                  {...register('joinDate', { required: 'Date of Join is required' })}
                  onInput={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3} lg={3} xl={3} >
                <TextField
                  fullWidth
                  label="NID"
                  name="nid"
                  value={formData.nid}
                  error={!!errors.nid}
                  helperText={errors.nid && errors.nid.message}
                  {...register('nid', { required: 'NID is required' })}
                  onInput={handleChange}

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
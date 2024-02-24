import React, { useState } from 'react';
import { Grid, TextField, Container, TableRow, TableHead, TableCell, Paper, Button, FormControl, InputLabel, Select, MenuItem, Table } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';
import ApiCall from '../components/apiCollection/ApiCall';
import axios from "axios";
import Loading from './loader/Loading';
import { useNavigate } from 'react-router-dom';


const AddNewTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tableNumber: '',
    numberOfSeats: '',
    image: '',
    base64: ''
  });

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
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${ApiCall.baseUrl}Table/create`, formData);
      console.log(response)

      if (response.status === 200) {
        navigate("/admin/table-list");
        setIsLoading(false)
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
      {isLoading ?

        <Container>
          <Loading />
        </Container>

        :
        <Container>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Table >
              <TableHead>
                <TableRow >
                  <TableCell className='page-title' sx={{ borderBottom: "3px solid  #CC080B" }} align="left" colSpan={12}>
                    Add Table
                  </TableCell>
                </TableRow>

              </TableHead>
            </Table>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
                {/* First Row */}
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Table Number"
                        name="tableNumber"
                        value={formData.tableNumber}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel >Number of Seats</InputLabel>
                        <Select
                          value={formData.numberOfSeats}
                          onChange={handleChange}
                          name="numberOfSeats"
                          required
                          label="Number of Seats"
                          
                        >
                          <MenuItem value={`2`}>2</MenuItem>
                          <MenuItem value={`4`}>4</MenuItem>
                          <MenuItem value={`6`}>6</MenuItem>
                          <MenuItem value={`8`}>8</MenuItem>
                          <MenuItem value={`12`}>12</MenuItem>
                          
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingBottom: '10px' }}>
                      <Button type="submit" fullWidth variant="outlined" sx={{
                        color: "white",
                        backgroundColor: '#CC080b',
                        border: "2px solid #CC080B",
                        fontSize: "14px",
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        fontWeight: 'bold',
                        "&:hover": {
                          color: "white",
                          backgroundColor: '#CC080b',
                          border: "2px solid #CC080B",
                        },
                      }}>Submit</Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Image Picker */}
                <Grid item xs={4}>
                  <div style={{ border: '1px dashed #ccc', padding: '5px', textAlign: 'center', height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    {formData.base64 && <img src={formData.base64} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '130px', marginTop: '10px', marginLeft: "auto", marginRight: "auto" }} />}
                    <input style={{ maxWidth: '200px', maxHeight: '130px', marginTop: '10px', marginLeft: "auto", marginRight: "auto" }} type="file" accept="image/*" name="image" onChange={handleChange} />

                  </div>
                </Grid>


                {/* Fifth Row */}

              </Grid>
            </form>
          </Paper>
        </Container>
      }
    </>

  );
};

export default AddNewTable;


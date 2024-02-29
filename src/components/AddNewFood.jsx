import React, { useState, useRef } from 'react';
import { Grid, TextField, Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import ApiCall from '../components/apiCollection/ApiCall';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/CommonStyle.css';
import UseLoader from './loader/UseLoader';

const AddNewFood = () => {
    const [loader, showLoader, hideLoader] = UseLoader();
    const navigate = useNavigate();
    const hiddenFileInput = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discountType: '',
        discount: '',
        discountPrice: '',
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
            // if (name === 'discount' || name === 'price') {
            //     if (formData.discountType === '2') { // Flat discount
            //         const discountPrice = parseFloat(formData.price) - parseFloat(value);
            //         setFormData({ ...formData, discountPrice: isNaN(discountPrice) ? '' : discountPrice.toString() });
            //     } else if (formData.discountType === '3') { // Percentage discount
            //         const discountPrice = parseFloat(formData.price) * (1 - parseFloat(value) / 100);
            //         setFormData({ ...formData, discountPrice: isNaN(discountPrice) ? '' : discountPrice.toString() });
            //     }
            // }
        }
    };

    async function handleSubmit(e) {
        showLoader();
        e.preventDefault();
        try {
            const response = await axios.post(`${ApiCall.baseUrl}Food/create`, formData);
            console.log(response)

            if (response.status === 200) {
                navigate("/admin/food-list");
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
                        <span style={{ paddingBottom: 50 }} className=' page-title'>Add Food</span>
                    </div>
                </div>
                <div className='mainTableContainer' style={{padding: 40}}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
                            {/* First Row */}
                            <Grid item xs={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Food Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField

                                            fullWidth
                                            label="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            multiline
                                            rows={5}
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

                            {/* Fourth Row */}
                            <Grid item xs={3} >
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel >Select Discount Type</InputLabel>
                                    <Select
                                        value={formData.discountType}
                                        onChange={handleChange}
                                        name="discountType"
                                        required
                                        label="Select Discount Type"
                                    >
                                        <MenuItem value={`1`}>None</MenuItem>
                                        <MenuItem value={`2`}>Flat</MenuItem>
                                        <MenuItem value={`3`}>Percentage</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Discount in (%)"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                />

                            </Grid>
                            <Grid item xs={3} >
                                <TextField
                                    fullWidth
                                    label="Discount Price"
                                    name="discountPrice"
                                    value={formData.discountPrice}
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

export default AddNewFood;

// import React, { useState } from 'react';

// const YourComponent = () => {
//     const [number, setNumber] = useState('');
//     const [type, setType] = useState('');
//     const [value, setValue] = useState('');
//     const [result, setResult] = useState('');

//     const handleNumberChange = (e) => {
//         setNumber(e.target.value);
//     };

//     const handleTypeChange = (e) => {
//         setType(e.target.value);
//         setValue('');
//         setResult('');
//     };

//     const handleValueChange = (e) => {
//         setValue(e.target.value);
//         if (type === 'percentage') {
//             setResult(number * (e.target.value / 100));
//         } else if (type === 'flat') {
//             setResult(number - e.target.value);
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="number"
//                 value={number}
//                 onChange={handleNumberChange}
//                 placeholder="Enter number"
//             />
//             <select value={type} onChange={handleTypeChange}>
//                 <option value="">Select type</option>
//                 <option value="flat">Flat</option>
//                 <option value="percentage">Percentage</option>
//             </select>
//             {type && (
//                 <>
//                     <input
//                         type="number"
//                         value={value}
//                         onChange={handleValueChange}
//                         placeholder={type === 'flat' ? 'Enter flat value' : 'Enter percentage value'}
//                     />
//                     {type === 'flat' ? (
//                         <input
//                             type="number"
//                             value={result}
//                             readOnly
//                             placeholder="Result"
//                         />
//                     ) : (
//                         <input
//                             type="number"
//                             value={result}
//                             readOnly
//                             placeholder="Result"
//                             disabled
//                         />
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default YourComponent;

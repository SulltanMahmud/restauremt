import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import ApiCall from '../components/apiCollection/ApiCall';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/CommonStyle.css';
import UseLoader from './loader/UseLoader';
import { DiscountType } from './utils/utils'
import DefaultAdminImage from '../assets/img/defaultImg.png'

const AddNewFood = () => {
    const [discountPrice, setDiscountPrice] = useState(0);
    const [loader, showLoader, hideLoader] = UseLoader();
    const navigate = useNavigate();
    const hiddenFileInput = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        discountType: DiscountType.None,
        discount: 0,
        discountPrice: 0,
        image: '',
        base64: ''
    });

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const calculateDiscountPrice = () => {
        // Calculate the discount price here
        const discount = formData.discountType === DiscountType.Percent
            ? formData.price - ((formData.price * formData.discount) /100)
            : (formData.discountType === DiscountType.Flat
                ? formData.price - formData.discount
                : 0
            );
        setDiscountPrice(discount);
    };

    const imageChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData({ ...formData, [name]: value, base64: reader.result });
            };
        }
    }

    const discountTypeChange = (e) => {
        const { name, value } = e.target;
        calculateDiscountPrice();
        setFormData({ ...formData, discountType: value, discount: formData.discount, discountPrice: discountPrice });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async () => {
        showLoader();

        try {
            const response = await axios.post(`${ApiCall.baseUrl}Food/create`, formData);

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
    useEffect(() => {
        calculateDiscountPrice();
    }, [formData])
    return (
        <>
            <Paper className='mainPaperStyle'>
                <div className='page-top' style={{ borderBottom: "3px solid  #CC080B" }}>
                    <div >
                        <span style={{ paddingBottom: 50 }} className=' page-title'>Add Food</span>
                    </div>
                </div>
                <div className='mainTableContainer customPadding'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
                            {/* First Row */}
                            <Grid item xs={12} sm={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Food Name"
                                            name="name"
                                            value={formData.name}
                                            onInput={handleChange}
                                            error={!!errors.name}
                                            helperText={errors.name && errors.name.message}
                                            {...register('name', { required: 'Food Name is required' })}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField

                                            fullWidth
                                            label="Description"
                                            name="description"
                                            value={formData.description}

                                            multiline
                                            rows={5}
                                            onInput={handleChange}
                                            error={!!errors.description}
                                            helperText={errors.name && errors.description.message}
                                            {...register('description', { required: 'Description is required' })}

                                        />
                                    </Grid>

                                </Grid>
                            </Grid>

                            {/* Image Picker */}
                            <Grid item xs={12} sm={4}>
                                <div onClick={handleClick} className='image-picker-container'>
                                    {
                                        formData.base64 ?
                                            <img src={formData.base64} alt="Uploaded" className='image-style' />
                                            : <img src={DefaultAdminImage} alt="Default" className='image-style' />
                                    }
                                    <input style={{ display: 'none' }} type="file" accept="image/*" name="image" onChange={imageChange} ref={hiddenFileInput} />
                                </div>
                            </Grid>

                            {/* Fourth Row */}
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth

                                    label="Price"
                                    name="price"
                                    value={formData.price}

                                    type='number'
                                    onInput={handleChange}
                                    
                                    error={!!errors.price}
                                    helperText={errors.price && errors.price.message}
                                    {...register('price', { required: 'Price is required' })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel >Select Discount Type</InputLabel>
                                    <Select
                                        value={formData.discountType}
                                        onChange={discountTypeChange}
                                        name="discountType"
                                        required
                                        label="Select Discount Type"
                                    >
                                        <MenuItem value={DiscountType.None}>None</MenuItem>
                                        <MenuItem value={DiscountType.Flat}>Flat</MenuItem>
                                        <MenuItem value={DiscountType.Percent}>Percentage</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    label={formData.discountType === DiscountType.Percent ? "Discount in (%)" : "Discount in (৳)"}
                                    name="discount"
                                    disabled={formData.discountType === DiscountType.None ? true : false}
                                    value={formData.discount}
                                    onChange={handleChange}
                                    type='number'
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    label="Discount Price"
                                    name="discountPrice"
                                    value={discountPrice}
                                    disabled={formData.discountType === DiscountType.None ? true : false}
                                    type='number'
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
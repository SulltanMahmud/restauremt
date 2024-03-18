import * as React from 'react';
import axios from "axios";
import LoginAside from '../components/login/LoginAside';
import ApiCall from '../components/apiCollection/ApiCall';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UseLoader from '../components/loader/UseLoader.jsx';
import '../styles/Login.css';
import { IconButton, InputAdornment, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LogoImg from '../assets/logo.png';


export default function Login() {

    const navigate = useNavigate();
    const [loader, showLoader, hideLoader] = UseLoader();
    const [showPassword, setShowPassword] = useState(false);


    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const [formData, setFormData] = useState({
        userName: 'admin@mail.com',
        password: 'Admin@123',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            showLoader();
            const response = await axios.post(`${ApiCall.baseUrl}Auth/SignIn`, formData);
            if (response.status === 200) {
                const token = "Bearer " + response.data.token;
                const user = response.data.user;

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                hideLoader();
                navigate("/admin");
            }

        } catch (error) {

            hideLoader();

            Swal.fire({
                icon: "error",
                title: "Failed To Login",
                text: "Invalid Password or Username",
            });
            navigate("/admin");
        }
    };

    return (
        <>

            <div className='main-container'>
                <div className='login-container'>
                    <LoginAside />
                    <div className='login-form-container'>
                        <div className='login-form'>
                            <div className='logo-container'>
                                <img
                                    src={LogoImg}
                                    alt="icon"
                                    className='logo'
                                />
                                <p className='logo-text'>BSS RESTAURANT</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label-text">
                                        Username:
                                    </label>
                                    <TextField
                                        fullWidth
                                        required
                                        value={formData.userName}
                                        onChange={handleChange}
                                        name='userName'
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label-text">
                                        Password:
                                    </label>
                                    <TextField
                                        fullWidth
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        name="password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    sx={{ ":hover":{color: "#CC080B"}}}
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="form-control">

                                    <Button type="submit" fullWidth variant="outlined" sx={{
                                        fontFamily: "'Josefin Sans', sans-serif",
                                        color: "white",
                                        backgroundColor: '#CC080b',
                                        border: "2px solid #CC080B",
                                        fontSize: "14px",
                                        paddingTop: '10px',
                                        paddingBottom: '10px',


                                        "&:hover": {
                                            color: "white",
                                            backgroundColor: '#9b0608',
                                            border: "2px solid #9b0608",
                                        },
                                    }}>Login</Button>
                                </div>
                            </form>
                            <div className='back-link'>
                                <a href="">Back To Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loader}

        </>
    )
}

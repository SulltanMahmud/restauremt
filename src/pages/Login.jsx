import React from 'react'
import { useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import LoginAside from '../components/login/LoginAside';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    const token = localStorage.getItem("token");
    const LoggedUser = localStorage.getItem("user");

    // console.log(token, LoggedUser)


    async function handleSubmit(e) {
        e.preventDefault();
        const userName = e.target[0].value;
        const password = e.target[1].value;
        const user = { userName, password };

        try {
            const response = await axios.post("https://restaurantapi.bssoln.com/api/Auth/SignIn", user);
            // setUser(user);

            if (response.data) {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "Welcome to BSS Restaurant",
                });

                const token = "Bearer " + response.data.token;
                const user = response.data.user;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/admin")
            }

        } catch (error) {
            console.error(error);
        }
        
    };

    
    

    return (
        <div
            className="bg-cover bg-no-repeat bg-center w-screen"
            style={{
                background: `linear-gradient(0deg,rgba(255,255,255,.6),rgb(255,255,255)),url('../src/assets/img/dash-bg.png')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "white",
            }}
        >
            <div className="h-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-center lg:gap-20 ">
                <LoginAside/>
                <div className="mx-auto w-full  px-12">
                    <div className="lg:h-[600px] lg:w-[500px] border p-5 bg-[#f1f1f1] rounded-xl">
                        <div>
                            <img
                                src="../src/assets/logo.png"
                                alt=""
                                className="w-[110px] mx-auto"
                            />
                            <p className="text-center text-3xl">
                                <span
                                    className="text-3xl font-black"
                                    style={{
                                        color: "white",
                                        // WebkitTextFillColor: "white",
                                        WebkitTextStroke: "1.5px red",
                                        fontSize: "32px",
                                        fontWeight: "bolder",
                                    }}
                                >
                                    BSS RESTAURANT
                                </span>
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-xl font-medium">
                                        Username
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    defaultValue={"admin@mail.com"}
                                    className="input border-2 border-black bg-gray-300 text-black"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-xl font-medium">
                                        Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    defaultValue={"Admin@123"}
                                    className="input  border-2 border-black bg-gray-300 text-black"
                                />
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    type="submit"
                                    value="Login"
                                    className="btn bg-red-700 text-white py-2 text-xl hover:bg-red-800"
                                />
                            </div>
                        </form>
                        <div className="w-full flex items-center justify-center">
                            <button className=" text-red text-center mt-4 hover:underline">
                                Back to home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

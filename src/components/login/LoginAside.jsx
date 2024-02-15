import React from 'react'

export default function LoginAside() {
    return (
        <div>
            <div
                className=" w-full max-h-full hidden lg:flex justify-center items-center "
                style={{
                    backgroundImage: "url('../src/assets/img/food-bg2.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div>
                    <img
                        src="../src/assets/img/login-bg.png"
                        className="max-w-[600px] max-h-[600px] animate-spin-slow"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

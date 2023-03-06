import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { env } from '../config';



const ForgotPassword = () => {

    const [data, setData] = useState();

    const { id, token } = useParams();

    const navigate = useNavigate();

    const [data2, setData2] = useState(false);

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const userValid = async () => {
        const res = await fetch(`${env.api}/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => setData(data))

        if (data.status == 201) {
            console.log("User Valid")
        } else {
            navigate("*")
        }
    }


    const setVal = (e) => {

        setPassword(e.target.value)
    }


    const sendpassword = async (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else {
            const res = await fetch(`${env.api}/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });


            const data = await res.json()

            if (data.status == 201) {
                setPassword("")
                setMessage(true)
            } else {
                toast.error("! 😐 Token Expired generate new LInk ", {
                    position: "top-center"
                })
            }
        }
    }


    useEffect(() => {
        userValid()
        setTimeout(() => {
            setData2(true)
        }, 3000)
    }, [])


    return (
        <>
            {
                data2 ? (
                    <>
                        <section>
                            <div className="form_data">
                                <div className="form_heading">
                                    <h1>Enter Your New Password</h1>

                                </div>

                                {
                                    message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Reset Successfully 🎉🎊😉</p> : " "
                                }

                                <form>
                                    <div className="form_input">
                                        <label htmlFor="password">New Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={setVal}
                                            name="password"
                                            id="password"
                                            placeholder="Enter Your New Password"
                                        />
                                    </div>


                                    <button className="btn" onClick={sendpassword}>Submit</button>

                                </form>
                                <ToastContainer />
                            </div>
                        </section>
                    </>
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        Loading .....
                        <CircularProgress />
                    </Box>
                )
            }

        </>
    )
}

export default ForgotPassword
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { Error } from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import { env } from "./config";




function App(){

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

  const navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    //   console.log(token)

    const res = await fetch(`${env.api}/validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
     console.log("User not Valid")
    } else {
      console.log("User Verify");
      setLoginData(data);
      navigate("/dash");
    }
  };

  useEffect(() => {
    setTimeout(()=>{
      DashboardValid();
      setData(true)
    }, 2000)

  }, []);

  return (
    <>
      {data ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent:"center", alignItems:"center", height:"100vh" }}>
          Loading .....
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App;

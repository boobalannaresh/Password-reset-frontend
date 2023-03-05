import React, {useState, useContext, useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { env } from '../config';



const Dashboard = () => {

   

  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);

  const navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    //   console.log(token)

    const res = await fetch(`${env.api}/validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });

    const data = await res.json();

    if (data.status == 401 || !data){
      navigate("*");
    } else {
      console.log("User Verify");
      setLoginData(data);
      navigate("/dash");
    }
  }

  useEffect(() => {

    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000)

  }, [])

  return (
    <>
       {
         data ? (
            <div
          style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "200px", marginTop: "20px" }}
          src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
          alt="profile-picture"
        />

        <h1>User Email: {logindata ? logindata.ValidUserOne.email : ""} </h1>
      </div>        
         ): (
            <Box sx={{ display: "flex", justifyContent:"center", alignItems:"center", height:"100vh" }}>
              Loading .....
              <CircularProgress />
            </Box>
          )
       }

      
    </>
  );
};

export default Dashboard;

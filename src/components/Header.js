import React, { useContext, useState } from "react";
import "./header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { env } from "../config";



const Header = () => {

  const [data, setData] = useState()
  const navigate = useNavigate()

  const { logindata, setLoginData } = useContext(LoginContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
         Accept: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => setData(data))

    if (data.status == 201) {

      console.log("User Log-Out");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false)
      navigate("/");

    } else {
      console.log("Error")

    }
  }

  const goDash = () => {
    navigate("/dash")
  }


  const goError = () => {
    navigate("*")
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/"><h1>Authantication-<span style={{ color: "blue", fontWeight: "bold" }}>Login</span></h1></Link>

          <div className="avtar">
            {logindata.ValidUserOne ? (
              <Avatar
                style={{
                  background: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClick}
              >
                {logindata.ValidUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar style={{ background: "blue" }} onClick={handleClick}></Avatar>
            )}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >

            {

              logindata.ValidUserOne ? (
                <>
                  <MenuItem onClick={() => {
                    goDash()
                    handleClose()
                  }}>Profile</MenuItem>
                  <MenuItem onClick={() => {
                    logoutuser()
                    handleClose()
                  }}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => {
                    goError()
                    handleClose()
                  }}>Profile</MenuItem>
                </>
              )

            }

          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;


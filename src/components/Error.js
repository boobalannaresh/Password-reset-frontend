
import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    <>
     <div className="container">
        <div style={{ minHeight: "85vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="error" style={{ width: "40%" }} />
          {/* <h1 className="mb-3">404 ERROR </h1> */}
          <h2>PAGE NOT FOUND</h2>
          <Link to="/" className="btn btn-primary" style={{ fontSize: 18 }}> Back To Home Page </Link>
        </div>
      </div>
    </>
  )
}

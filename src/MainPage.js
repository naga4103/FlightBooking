import React, { useEffect } from "react";
import "./index.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import MainCode from "./MainCode";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { adminSignUp } from "./flightSlice";
import {} from "./flightSlice";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.counter.token.payload);
  console.log("token before", token);
  const jwtToken = localStorage.getItem("jwtToken");
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("authenticated");
  //   if (loggedInUser) {
  //     console.log("LoggedInUser", loggedInUser);
  //     setAuthenticated(loggedInUser);
  //   }
  // }, []);

  // const jwtToken = Cookies.get("useremail");
  // if (jwtToken === undefined) {
  //   // <Redirect to="/" />;
  //   navigate("/");
  // }

  // !localStorage.getItem("signin");

  if (!token) {
    return <Navigate replace to="/" />;
    // <Navigate replace to="/" />;
    // navigate("/");

    // window.location.href = "/";
  } else {
    return (
      <div className="main-page-container">
        {/* <img
        src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sky-cloud-air-malaysia-weechiams11urlcomtw.jpg"
        alt="Flight Image"
        className="bg-img"
        
      /> */}

        {/* <div className="main-sub-page-container"> */}
        <div className=" min-h-[80vh]">
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/227/332/non_2x/travel-and-flight-ticket-advertising-template-with-airplane-in-the-sky-colorful-background-in-paper-cut-style-illustration-vector.jpg"
            // src="/images/flight1.jpg"
            alt="Cover Page"
            className="cover-page"
          />

          <img
            src="https://i.pinimg.com/originals/ab/9d/16/ab9d160d211535fb7d23625be2a2884e.png"
            alt="Logo"
            className="logo-img"
          />
          <br />

          {/*NavBar*/}

          <Navbar bg="transparent" variant="light">
            <Container>
              {/* <Navbar.Brand href="#home" className="border-2 border-indigo-800">
              Flight Booking
            </Navbar.Brand> */}
              <Nav className="flex justify-between  w-[1400px]">
                <Nav.Link
                  style={{ fontSize: "24px" }}
                  onClick={async () => {
                    const response = await dispatch(adminSignUp());
                    console.log("Ressssponse", response);
                    console.log("o/p of thunk", response.payload?.data.success);
                    const output = response.payload?.data.success;
                    if (output === 1) {
                      navigate("/viewTickets");
                      localStorage.remove("jwtToken");
                    } else navigate("/");
                  }}
                >
                  View Tickets
                </Nav.Link>
                <Nav.Link style={{ fontSize: "24px" }} href="/cancelTickets">
                  Cancel Tickets
                </Nav.Link>
                <Nav.Link style={{ fontSize: "24px" }} href="/modifyTickets">
                  Modify Trip
                </Nav.Link>

                <Nav.Link style={{ fontSize: "24px" }}>LoggedIn</Nav.Link>
                <Nav.Link
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("signin");

                    // navigate("/");
                    window.location.href = "/";
                  }}
                  style={{ fontSize: "24px" }}
                >
                  LogOut
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <br />
          <MainCode />
        </div>

        <br />
        {/* </div> */}

        <div className="footer  min-h-[20vh]">
          <h3>Book Now</h3>
          <p>
            Book Now helps you to book flight tickets from anywhere to anywhere
            at anytime across the world
          </p>
          <p>Contact us @ booknow@gmail.com</p>
        </div>
      </div>
    );
  }
};

export default MainPage;

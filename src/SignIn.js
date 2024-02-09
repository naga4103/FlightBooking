import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails, setErrorMsg, setToken } from "./flightSlice";
import { userLogin } from "./signinSlice";

import "./index.css";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  const userDetails = useSelector((state) => state.counter.userDetails);

  // const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  // const [errorMsg, setErrorMsg] = useState({ email: "", password: "" });
  const errorMsg = useSelector((state) => state.counter.errorMsg);

  // const userEmail = "gani@gmail.com";
  // const userPassword = "ganisir";
  // const userEmail = "kminchelle";
  // const userPassword = "0lelplR";
  const userEmail = "jona1@gmail.com";
  const userPassword = "12345678";

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("user details", userDetails);

    if (
      userDetails.email === userEmail &&
      userDetails.password === userPassword
    ) {
      const payload = {
        email: userDetails.email,
        password: userDetails.password,
      };

      const response = await dispatch(userLogin(payload));
      console.log("response", response);

      if (response.payload.status === "Success") {
        localStorage.setItem("jwtToken", response.payload.token);
        console.log("jwtToken", response.payload.token);
        localStorage.setItem("signin", true);
        dispatch(setToken(response.payload.token));
        toast.success("Successfully logged in");
        navigate("/home");
      } else {
        toast.error("Login Failed");
      }

      // const response = await fetch("https://dummyjson.com/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     username: userDetails.email,
      //     password: userDetails.password,
      //     // expiresInMins: 60, // optional
      //   }),
      // });
      // const dataResponse = await response.json();
      // .then((res) => res.json())
      // .then(console.log);

      // console.log("URL Response", dataResponse);
      // const token2 = dataResponse.token;
      // console.log("token setting", token2);
      // dispatch(setToken(token2));

      // localStorage.setItem("signin", true);
      // navigate("/home");
    } else if (
      userDetails.email === userEmail &&
      userDetails.password !== userPassword
    ) {
      toast.error("Enter Valid Email and Password");
    } else if (
      userDetails.email !== userEmail &&
      userDetails.password === userPassword
    ) {
    } else {
      toast.error("Enter valid credentials");
    }
  };

  return (
    <div className="signin-container ">
      <Card className="shadow-lg w-[550px] p-[10px]">
        <Card.Title style={{ textAlign: "center" }}>Sign In</Card.Title>
        <Card.Body>
          <Form onSubmit={onSubmitForm} className="">
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                onChange={(e) => {
                  // setUserDetails({ ...userDetails, email: e.target.value });
                  dispatch(setUserDetails({ email: e.target.value }));
                }}
                // onBlur={(e) => {
                //   if (!emailRegex.test(e.target.value)) {
                //     // setErrorMsg({
                //     //   ...errorMsg,
                //     //   email: "*Enter Valid Email",
                //     // });
                //     dispatch(setErrorMsg({ email: "*Enter Valid Email" }));
                //   } else {
                //     // setErrorMsg({
                //     //   ...errorMsg,
                //     //   email: "",
                //     // });
                //     dispatch(
                //       setErrorMsg({
                //         email: "",
                //       })
                //     );
                //   }
                // }}
                required
              />
              <p style={{ color: "Red" }}>{errorMsg.email}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  // setUserDetails({ ...userDetails, password: e.target.value });
                  dispatch(setUserDetails({ password: e.target.value }));
                }}
                // onBlur={() => {
                //   if (
                //     !(
                //       userDetails.password.length >= 3 &&
                //       userDetails.password.length <= 10
                //     )
                //   ) {
                //     dispatch(
                //       setErrorMsg({
                //         password: "*Password should be 3 to 10 chars",
                //       })
                //     );
                //   } else {
                //     dispatch(setErrorMsg({ password: "" }));
                //   }
                // }}
                required
              />

              <p style={{ color: "Red" }}>{errorMsg.password}</p>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default SignIn;

import React, { useState } from "react";
import { useAppContext } from "../../libs/contextLib";
import axios from 'axios'
import { Redirect } from "react-router-dom";


import "./Login.css";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();

  const [state , setState] = useState({
    
    email : "",
    password : ""
  })
  const [userEmail , setUserEmail] = useState("");
  const [loginError, setLoginError] = useState(null);


  // console.log("email: " + userEmail);
  // console.log("error: " + loginError);




  const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    try {
        
        if (state.email == "") {
            alert("email cannot be null");
        }
        else if (state.password == "") {
            alert("password cannot be null");
        }
        else{
          const user = {
            email: state.email,
            password: state.password
          };
          try {              
            axios.post('http://localhost:5000/users/login', user)
            .then(response => setUserEmail(response.data.email))
            .catch(error => {
                setLoginError(error.message);
            })
          } catch (error){
            console.log(error);
          }
        }
      
          
    }
    catch(e) {
        console.log("error: " + e);
    }
  }

  if (userEmail) {
    userHasAuthenticated(true);
    window.sessionStorage.setItem("userEmail", userEmail);
    // localStorage.setItem('test', 1);

  }
  // const s = window.sessionStorage.getItem("userEmail")
  // console.log("session : " + s);

  if (loginError) {

    return(
      <p style={{fontSize:'30px'}}>
          Error! <br/>
          Email or password is wrong <br/>
          <a
              href= "http://localhost:3000/login"
          >
              Back to Login
          </a>
      </p>
  );

  }
  return (
    <div>
      {userEmail ? (
        <div>
            {/* <Redirect to="/" /> */}
            <p style={{fontSize:'30px'}}>
              Welcome! {window.sessionStorage.getItem("userEmail")}<br/>
              
              <a
                  href= "http://localhost:3000/"
              >
                  Back to home
              </a>
            </p>
        </div>
      ) : (
            <div class="loginbox">
            <form>
              <h1 class="loginHere">Login Here</h1>


              <div className="form-group text-left">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" 
                    className="form-control" 
                    id="email" 
                    aria-describedby="emailHelp" 
                    placeholder="Email" 
                    value={state.email}
                    onChange={handleChange}
              />
              
              </div>
              <div className="form-group text-left">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" 
                      className="form-control" 
                      id="password" 
                      placeholder="Password"
                      value={state.password}
                      onChange={handleChange} 
                  />
              </div>
              
              <button
                  class="login" 
                  type="submit" 
                  className="login"
                  onClick={handleSubmitClick}
              >
                  Login
              </button>
            </form>

            <a href="http://localhost:3000/register">Haven't created an account yet?</a>


          {/* <p> email : {state.email}</p>
          <p> password : {state.password}</p> */}

        </div>
      )}
    </div>
  );
}
import React, { useState } from "react";

import "./Login.css";

export default function Login() {
  const [loginState , setLoginState] = useState({
    email : "",
    password : ""
  })
  console.log("password: " + loginState.password);
  
  const handleChange = (e) => {
    const {id , value} = e.target   
    setLoginState(prevState => ({
        ...prevState,
        [id] : value
    }))
}

const handleSubmitClick = (e) => {
  console.log(" button triggered");

}


  return (
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
               value={loginState.email}
               onChange={handleChange}
        />
        
        </div>
        <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" 
                className="form-control" 
                id="password" 
                placeholder="Password"
                value={loginState.password}
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
  );
}
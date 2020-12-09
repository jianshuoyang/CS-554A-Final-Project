import React, {useState, useEffect} from 'react';
import user from '../../data/users';
import "./Register.css";


function RegistrationForm(props) {
    const [submitStatus, setSubmitStatus] = useState(false); 
    const [state , setState] = useState({
        firstname: "",
        lastname:"",
        gender:"",
        email : "",
        password : ""
    })

    useEffect(() => {
        console.log('on load useeffect');
        
		async function fetchData() {
			try {
                if (submitStatus) {
                    await user.addUser(state.firstname, state.lastname, state.gender, state.email); 
                }
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [submitStatus]);

    console.log("firstname: " + state.firstname);
    

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
            if(state.password === state.confirmPassword) {
                setSubmitStatus(true); 
            } else {
                props.showError('Passwords do not match');
            }
        }
        catch(e) {
            console.log("error: " + e);
        }
    }

    return(
        <div id="register-box">
            <form>

                <h1 class="registerHere">Register Here</h1>

                <div className="form-group text-left">
                    <label>First Name</label>
                    <input type="text" 
                        className="form-control" 
                        id="firstname" 
                        placeholder="First Name"
                        value={state.firstname}
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group text-left">
                    <label>Last Name</label>
                    <input type="text" 
                        className="form-control" 
                        id="lastname" 
                        placeholder="Last Name"
                        value={state.lastname}
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group text-left">
                    <label>Gender</label>
                    <input type="text" 
                        className="form-control" 
                        id="gender" 
                        placeholder="Gender"
                        value={state.gender}
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
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
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="register"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>

            {/* <p> firstname : {state.firstname}</p>
            <p> password : {state.password}</p> */}

        </div>
        
    )
}

export default RegistrationForm;

import React from 'react';
import '../App.css';

const UserProfile = () => {
    const playerUrl = "https://open.spotify.com";

    const hash = window.location.hash.substr(1); //url of the current page
    const arHash = hash.split('='); //this creates an array with key ([0] element) and value ([1] element)
    const hash_value =  arHash[1]; //recieve value

    var access_token = hash_value;
    


    
    return (
		<div>
  
        <p class = "login" style={{fontSize:'30px'}}>
  
          Login Successful!
        </p>

        
        <p class = "login" style={{fontSize:'30px'}}>

                <a
                    href= {playerUrl}
                >
                    Spotify official player
                </a>
		</p>

        <p style={{fontSize:'15px'}}>
            The user's token: {access_token}
            
		</p>

        <p style={{fontSize:'15px'}}>
            Current Url: {window.location.href}
            
		</p>

              
      </div>

        
    )
};

export default UserProfile;

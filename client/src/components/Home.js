import React from "react";
import '../App.css';
import { Redirect } from "react-router-dom";



const Home = () => {
    const url = 'https://accounts.spotify.com/authorize?show_dialog=true&client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
    const e = window.sessionStorage.getItem("userEmail");
    
    if (e) {
        return (
            <div>
                        <Redirect to="/categories" />

            
              
            </div>
          
        )
    }

    return (
        
		<div>

            <p class = "login" style={{fontSize:'30px'}}>

                Welcome to music website, you can access other page after login &nbsp;
                <a
                    href= {url}
                >
                    Open Spotify Online
                </a>

            </p>
            
		</div>
      
    )
};

export default Home;

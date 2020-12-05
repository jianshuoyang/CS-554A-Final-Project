import React from 'react';
import '../App.css';

const Home = () => {
    const url = 'https://accounts.spotify.com/authorize?show_dialog=true&client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';

    return (
		<div>

            <p class = "login" style={{fontSize:'30px'}}>

                <a
                    href= {url}
                >
                    Login/Sign Up with Spotify
                </a>
			</p>
            
		</div>
      
    )
};

export default Home;
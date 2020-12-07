import React from "react";
import { Link, withRouter } from 'react-router-dom';
import LibraryAddOutlined from '@material-ui/icons/LibraryAddOutlined';
import moment from "moment";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	song_li: {
        listStyleType: 'none',
        borderBottom: '1px solid #666',
        display: 'flex',
        lineHeight: 'normal',
        fontSize: '14px',
        cursor: 'pointer',
        marginLeft:'30px',
        marginRight:'30px',
        '&:hover':{
            color: '#000000',
            background: '#ccffcc'
        }
    },
    song_title_header:{
        width: '300px'
    },
    song_title: {
        width: '300px'
    },
    song_title_header1: {
        width: '300px'
    },
    song_album:{
        width: '250px'
    },
    song_album_header: {
        width: '250px'
    },
    song_artist:{
        width: '200px'
    },
    song_artist_header: {
        width: '200px'
    },
    song_length:{
        width: '60px',
    },
    song_icon:{
        width: '60px',
        textAlign:'center',
        position: 'relative',
        top: '10px'
    },
    song_length_header: {
        width: '60px'
    },
    song_added:{
        width: '150px'
    },
    song_added_header: {
        width: '150px'
    },
    song_header_container: {
        display: 'flex',
        borderBottom: '1px solid #666',
        paddingBottom: '6px',
        marginTop: '20px'
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover':{
            textDecoration: 'underline'
        }
    },
    linkhover :{
        textDecoration: 'underline'
    }

});
const Song = (props)=>{
    const classes = useStyles();
    const {song}=props;
    function timeFormat(time){
        const min = Math.floor(time/60000);
        const sec = ((time % 60000) / 1000).toFixed(0);
        return min+":"+(sec < 10 ? "0" : "")+sec;
    }
    return (
        <li className={classes.song_li} >
            <div className={classes.song_title}>
                <p>{song.track? song.track.name : song.name}</p>
            </div>

            <Link to={song.track?`/albumList/${song.track.artists[0].id}`:`/albumList/${song.artists[0].id}`} className={classes.link}>
            <div className={classes.song_artist}>
                <p>{song.track?song.track.artists[0].name:song.artists[0].name}</p>
            </div>
            </Link>
            {song.track?
            <Link to={`/albums/songsList/${song.track.album.id}`} className={classes.link}>
            <div className={classes.song_album}>
                <p>{song.track?song.track.album.name:'-'}</p>
            </div>
            </Link>:
            <div className={classes.song_album}>
                <p>{song.album?song.album.name:song.name?song.name:'-'}</p>
            </div>}

            <div className={classes.song_added}>
                <p>{song.track? moment(song.added_at).format("YYYY-MM-DD") : song.album?song.album.release_date:'-'}</p>
            </div>

            <div className={classes.song_length}>
                <p>{song.track?timeFormat(song.track.duration_ms):timeFormat(song.duration_ms)}</p>
            </div>
            <div className={classes.song_icon}>
                <i>
                <LibraryAddOutlined></LibraryAddOutlined>
                </i>
            </div>
        </li>
    )
}
export default withRouter(Song);
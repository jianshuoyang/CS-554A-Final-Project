import React, { useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';
import LibraryAddOutlined from '@material-ui/icons/LibraryAddOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import moment from "moment";
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import playAction from '../actions/playAction'

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
            background: '#f2ffe5'
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
        width: '100px',
    },
    song_icon:{
        width: '100px',
        textAlign:'left',
        position: 'relative',
        top: '10px',
        '&:hover':{
            color: '#8c8c8c',
        }
    },
    song_length_header: {
        width: '100px'
    },
    song_added:{
        width: '200px'
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
    play_control:{
        width:'100px',
        textAlign:'center',
        position: 'relative',
        top: '10px',
        '&:hover':{
            color: '#8c8c8c',
        }

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
    const [ play, setPlay] = useState(false);
    const [ pause, setPause] = useState(true);
    const allState = useSelector((state) => state);
    const songsPlay = allState.songsPlay;
    const songR = allState.songsPlay.song;
    const dispatch = useDispatch();
    const {song, index}=props;
    function timeFormat(time){
        const min = Math.floor(time/60000);
        const sec = ((time % 60000) / 1000).toFixed(0);
        return min+":"+(sec < 10 ? "0" : "")+sec;
    }

    // if(songsPlay.globalPlay&&song.track.id===songR.track.id){
    //     setPlay(true);
    // }else{
    //     setPlay(false);
    // }
    useEffect(()=>{
        if(songsPlay.globalPlay&&song.track.id===songR.track.id){
            setPlay(true);
        }else{
            setPlay(false);
        }
    },[songR,songsPlay.globalPlay])



    const handleChange=(song)=>{
        if(play){
            dispatch(playAction.pauseSong());
            setPause(true);
            setPlay(false);
            //pauseSong();

        }else{
<<<<<<< HEAD
            if(song.track.preview_url){
                console.log(song);
                dispatch(playAction.playSong(song,index));
                setPause(false);
                setPlay(true);
                //audioControl(song);
            }else{
                dispatch(playAction.toSong(song));
            }
        }
    }
    const handleAdd=(song)=>{
        //console.log(song);
        const addSong = {
            artist: song.track.artists[0].name,
            album: song.track.album?song.track.album.name : '',
            artistId:song.track.artists[0].id,
            albumId:song.track.album?song.track.album.id : '',
            songName:song.track.name,
            playUrl:song.track.preview_url,
            songId:song.track.id,
=======
            console.log(song);
            dispatch(playAction.playSong(song,index));
            setPause(false);
            setPlay(true);
            //audioControl(song);
>>>>>>> f87d840de9c9e6629a1f34a1ff43473c828d42c1
        }
    }
    return (
        <li className={classes.song_li} >
            <div  className={classes.play_control} onClick={()=>handleChange(song, index)}>
                {play&&songsPlay.globalPlay&&song.track.id===songR.track.id?<PauseCircleOutlineIcon></PauseCircleOutlineIcon>
                :
                <PlayCircleOutlineIcon  ></PlayCircleOutlineIcon>
                }
            </div>
            <div className={classes.song_icon}>
                <i>
                <LibraryAddOutlined></LibraryAddOutlined>
                </i>
            </div>
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

        </li>
    )
}
export default withRouter(Song);
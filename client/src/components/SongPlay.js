import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import playAction from '../actions/playAction'
import {  withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LinearProgress from '@material-ui/core/LinearProgress';
<<<<<<< HEAD
import Snackbar from '@material-ui/core/Snackbar';
=======
import { deprecationHandler } from "moment";
>>>>>>> f87d840de9c9e6629a1f34a1ff43473c828d42c1

const useStyles = makeStyles({
    song_details :{
        position: 'absolute',
        left: '20px',
        lineHeight: '22px',
    },
    song_name: {
        fontFamily:'"Proxima Nova" Georgia sans-serif',
        color: '#fff',
        fontSize: '14px'
    },
    artist_name: {
        fontFamily: '"Proxima Nova" Georgia sans-serif',
        color: '#aaa',
        fontSize: '12px'
      },

    progress_container:{
        position: 'relative',
        top: '-7px',
        fontSize: '40px',
        margin: '0 5px',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center'
    },
    progress : {
        width: '500px',
        height: '4px',
        background: 'rgb(64, 64, 64)',
        borderRadius: '4px'
      },
    footer :{
        position: 'fixed',
        width: '100%',
        bottom: 0,
        left: 0,
        background: '#006600',
        height: '80px',
        zIndex: 2,
    },
    song_controls:{
        justifyContent: 'center',
        display: 'flex',
        marginTop: '20px',
    },
    play_btn :{
        padding: "0 5px",
        color: 'rgb(179, 179, 179)',
        cursor: 'pointer',
    },
    last_song:{
        padding: "0 5px",
        color: 'rgb(179, 179, 179)',
        cursor: 'pointer',
    },
    next_song:{
        padding: "0 5px",
        color: 'rgb(179, 179, 179)',
        cursor: 'pointer',
    }

});

const SongPlay = (props)=>{
    const dispatch = useDispatch();
    const  classes =  useStyles();
    const [audio, setAudio] = useState(undefined);
    const allState = useSelector((state) => state);
    const songsPlay = allState.songsPlay;
    const song = allState.songsPlay.song;
    console.log(song);
    const songList = allState.songsPlay.songList;
<<<<<<< HEAD
    const track = allState.songsPlay.track;
    const [open, setOpen] = useState(undefined);

    let songTrackList = [];

        if(track==='albums'){
            songList.map((everySong)=>{
                let song = {
                    track: everySong
                }
                songTrackList.push(song);


            });
        }else{
            songTrackList =  songList;
        }


    const stopSong = () => {
        if (audio) {

=======
    const index = allState.songsPlay.currentIndex;
    const [ currentPlay, setCurrentPlay] = useState(songsPlay.globalPlay);
    const [ changeProgress, setChangeProgress] =  useState(undefined);

    const stopSong = () => {
        if (audio) {
        //this.props.stopSong();
>>>>>>> f87d840de9c9e6629a1f34a1ff43473c828d42c1
        audio.pause();
        }
    };

    const pauseSong = () => {
        if (audio) {
        //this.props.pauseSong();
        audio.pause();
        }
    };

    const resumeSong = () => {
        if (audio) {
        //this.props.resumeSong();
        audio.play();

        }
    };


    const audioControl = (song, index) => {
        console.log(song);
        //const { playSong, stopSong } = this.props;
        let  audioplay=null;

        if (audio === undefined) {
<<<<<<< HEAD
            if(song.track.preview_url){
                audioplay = new Audio(song.track.preview_url);

                console.log(audioplay);
                setAudio(audioplay);
                audioplay.play();
            }else{
                handleOpen();
                console.log("1");
            }
=======
            const audioplay = new Audio(song.track.preview_url);
            console.log(audioplay);
            setAudio(audioplay);
            //dispatch(playAction.updateIndex(index));
            audioplay.play();
>>>>>>> f87d840de9c9e6629a1f34a1ff43473c828d42c1
        } else {
            stopSong();
            //audioplay.pause();
            dispatch(playAction.stopSong());
<<<<<<< HEAD
            if(song.track.preview_url){
                dispatch(playAction.playSong(song, index));
                const audioplay = new Audio(song.track.preview_url);
                console.log(audioplay);
                setAudio(audioplay);
                audioplay.play();
            }else{
                handleOpen();
                console.log("le");
            }
=======
            dispatch(playAction.playSong(song, index));
            //playSong(song.track);
            const audioplay = new Audio(song.track.preview_url);
            console.log(audioplay);
            setAudio(audioplay);
            //dispatch(playAction.updateIndex(index));
            audioplay.play();
>>>>>>> f87d840de9c9e6629a1f34a1ff43473c828d42c1
        }
    };
    function handleOpen () {
        setOpen(true);
    };
    function handleClose ()  {
        setOpen(false);
      };

    const getSongIndex = () => {
        const SongIndex = songList.map((everySong, index) => {
          if (everySong.track.id === song.track.id) {
            return index;
          } else {
            return undefined;
          }
        }).filter(item => {
          return item !== undefined;
        })[0];

        return SongIndex;
      }
    const last =()=>{
<<<<<<< HEAD
        if(songTrackList.length!== 0){
            let SongIndex;
            if(song){
                SongIndex = getSongIndex();
            }else{
                SongIndex = 0;
            }
            setProgress(0);
            SongIndex === 0 ? audioControl(songTrackList[songTrackList.length - 1]) : audioControl(songTrackList[SongIndex - 1]);
        }else{
            handleOpen();
        }
    }
    const next =()=>{
        if(songTrackList.length!== 0){
            let SongIndex;
            console.log(songTrackList);
            if(song){
                SongIndex = getSongIndex();
            }else{
                SongIndex = songTrackList.length - 1
            }
            setProgress(0);
            SongIndex === songTrackList.length - 1 ? audioControl(songTrackList[0]) : audioControl(songTrackList[SongIndex + 1]);
        }else{
            handleOpen();
        }
    }

    const handleChange = (song)=>{
        if(song){
            if(songsPlay.globalPlay){
                dispatch(playAction.pauseSong());
                console.log("ee");
                pauseSong();
            }else{
                if(song){
                    dispatch(playAction.resumeSong());
                    resumeSong();
                    //audioControl(song);
                }else{
                    audioControl(songTrackList[0])
                }
            }
        }else{
            handleOpen();
=======
        let SongIndex = getSongIndex();
        setProgress(0);
        SongIndex === 0 ? audioControl(songList[songList.length - 1]) : audioControl(songList[SongIndex - 1]);

    }
    const next =()=>{
        let SongIndex = getSongIndex();
        setProgress(0);
        SongIndex === songList.length - 1 ? audioControl(songList[0]) : audioControl(songList[SongIndex + 1]);

    }

    const handleChange = (song)=>{
        if(songsPlay.globalPlay){
            dispatch(playAction.pauseSong());
            console.log("ee");
            pauseSong();
        }else{
            dispatch(playAction.resumeSong());
            resumeSong();
            //audioControl(song);
>>>>>>> f87d840de9c9e6629a1f34a1ff43473c828d42c1
        }
    }
    const MAX  = 30;
    const MIN  =  0;
    const normalise = value => (value - MIN) * 100 / (MAX - MIN);

    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        if(songsPlay.globalPlay){
            setProgress(0);
            const timer = setInterval(() => {
            var time =  0;
            setProgress((oldProgress) => {
                if (oldProgress === 30) {
                    dispatch(playAction.pauseSong());
                    clearInterval(timer);
                return 0;

                }
                const diff = 1;
                time += oldProgress
                return Math.min(oldProgress + diff, 30);
            });

            }, 1000);


        return () => {
        clearInterval(timer);
        };
      }
    }, [song, songsPlay.globalPlay]);
    useEffect(() => {
        if(songsPlay.playing === songsPlay.globalPlay){
            if(songsPlay.globalPlay){
                audioControl(song);
            }else{
                pauseSong();
            }
        }else{
            audioControl(song);
            console.log('d');
        }
    }, [songsPlay.globalPlay, song]);

    return(
          <div className={classes.footer}>
                <div className={classes.song_details}>
                    <p className={classes.song_name}>{song?song.track.name:''}</p>
                    <p className={classes.artist_name}>{song?song.track.artists[0].name:''}</p>
               </div>
               <div className={classes.song_controls}>

                    <div onClick={()=>last()} className={classes.last_song}>
                     <FastRewindIcon></FastRewindIcon>
                    </div>

                    <div className={classes.play_btn} onClick={()=>handleChange(song)}>
                    {/* <i onClick={"!this.props.songPaused ? this.props.pauseSong : this.props.resumeSong"} className={"showPlay"} aria-hidden="true" /> */}
                    {songsPlay.globalPlay? <PauseIcon/>:<PlayArrowIcon></PlayArrowIcon>
                    }
                    </div>

                    <div onClick={()=>next()} className={classes.next_song}>
                     <FastForwardIcon></FastForwardIcon>
                    </div>

                </div>
                <div className= {classes.progress_container}>
                    <div className={classes.progress}>
                       <LinearProgress variant="determinate" value={normalise(progress)} />
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Not Availiable"
                />

          </div>
      )

}

export default withRouter(SongPlay);
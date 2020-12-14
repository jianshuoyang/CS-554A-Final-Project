import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Pagination from '@material-ui/lab/Pagination'
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import addSong from "../actions/addSong";
const axios = require('axios').default;

const columns = [
    { id: 'name', label: 'Name', align: 'center', minWidth: 100 },
    { id: 'singer', label: 'Singer Name', align: 'center', minWidth: 100 },
    {
        id: 'albumName',
        label: 'Album Name',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'remove',
        label: 'Remove',
        minWidth: 100,
        align: 'center',
    }

];

// new part
// try {
//     let songObj = {
//         title: "song2",
//         artist: "singer2",
//         artistId: "singerID2",
//         albumName: "albumName2",
//         albumId: "albumId2"
//     }
//     const addSongRes = addSong(songObj);
//     console.log(addSongRes)
// } catch(e) {
//     console.log({error:e})
// }

// 拿到 了数据。写成这个格式get()==>obj
// let Nsong = {
//     track: {
//         album:{
//             id: obj.albumId,
//             name: obj.albumName,
//         },
//         artists: [
//             {
//                 id:obj.artistId,
//                 name: obj.artistName
//             }
//         ],
//         name: obj.title,
//         preview_url: obj.playUrl,
//         id:obj.songId
//     }
// },
// import playAction from '../actions/playAction'
// import {useDispatch} from 'react-redux';
// const dispatch = useDispatch();
// if(Nsong.track.preview_url){
//     dispatch(playAction.playSong(song));
// }else{
//     dispatch(playAction.toSong(song))
// }

function createData(name, singer, albumName) {
    return { name, singer, albumName, remove:" remove"};
}

const rows = [
    createData('India', 'IN', "IN"),
    createData('China', 'CN', 'CN'),
    createData('Italy', 'IT', 'IT'),
    createData('United States', 'US', 'US'),
    createData('Canada', 'CA', 'CA'),
    createData('Australia', 'AU', 'AU'),
    createData('Germany', 'DE', 'DE'),
    createData('Ireland', 'IE', 'IE'),
    createData('Mexico', 'MX', 'MX'),
    createData('Japan', 'JP', 'JP'),
    createData('France', 'FR', 'FR'),
    createData('United Kingdom', 'GB', 'GB'),
    createData('Russia', 'RU', 'RU'),
    createData('Nigeria', 'NG', 'NG'),
    createData('Brazil', 'BR', 'BR'),
];
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});
const LikedPage = () => {
    // const mongoCollection = require('../../../config/mongoCollections');
    // const user = mongoCollection.users;
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRemoveSong = () => {
        alert("remove")
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                    <TableCell align='center'>
                                        {row.name}
                                    </TableCell >
                                    <TableCell align='center'>
                                        {row.singer}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.albumName}
                                    </TableCell>
                                    <TableCell align='center' onClick={handleRemoveSong}>
                                        <DeleteOutlinedIcon/>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );



};

export default LikedPage






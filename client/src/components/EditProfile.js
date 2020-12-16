import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import  {makeStyles,} from "@material-ui/core";
const axios = require('axios');


const useStyles = makeStyles((theme) => ({
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
export default function FormDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const initialFormData = Object.freeze({
        firstName: '',
        lastName: '',
        gender: '',
    });

    const [formData, SetFormData] = useState(initialFormData);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(firstNameRef.current)
        console.log(formData)
        try {
            let updateInfo = {
                userEmail: window.sessionStorage.userEmail,
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
            }
            const updateRes = axios.post('http://localhost:5000/users/updateUser', updateInfo)
        } catch(e) {
            console.log()
        }

    };
    const handleChange = (e) => {
        if(e.target.name && e.target.value) {
            SetFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    };

    const handleRefresh = () => {
        window.location.reload()
    }


    return (
        <div>
            <Button variant="contained"
                    color="primary"
                    size="medium"
                    onClick={handleClickOpen}
                    startIcon={<EditIcon/>}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Profile Information</DialogTitle>
                <DialogContent>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit}
                    >
                        <TextField className="form-group"
                            required
                            id="standard-required"
                            label="First Name"
                                   name="firstName"
                                   onChange={handleChange}
                        />
                        <TextField className="form-group"
                            required
                            id="outlined-required"
                            label="Last Name"
                            name="lastName"
                            onChange={handleChange}
                        />
                        <TextField className="form-group"
                            required
                            id="outlined-required"
                            label="Gender"
                            name="gender"
                            onChange={handleChange}
                        />
                        <br/>
                        <br/>
                        <Button onClick={handleClose} color="primary" align='right'>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleRefresh} color="primary" align='right'>
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
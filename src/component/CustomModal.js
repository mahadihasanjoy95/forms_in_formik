import React from "react";
import {Box, Fab, Modal} from "@mui/material";
import UserAddForm from "./UserAddForm";
import AddIcon from '@mui/icons-material/Add';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#053742',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function CustomModal(props) {
    const {addUser} = props
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div className="outlet">
            <Fab className="bottomright" color="primary" aria-label="add" onClick={handleOpen}>
                <AddIcon/>
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserAddForm addUser = {addUser} handleClose = {handleClose}/>
                </Box>
            </Modal>
        </div>
    )

}
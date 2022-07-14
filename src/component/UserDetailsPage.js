import React, {useEffect, useState} from "react";
import {Box, Button, Table, TableBody, TableRow} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserDetailsPage(props) {
    let {id} = useParams();
    const [divisionForShow, setDivisionForShow] = useState("")
    const notify = () => toast.error('User not found with provided ID: '+id.replace(":", ""), {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const [user, setUser] = useState({
        id: null, first_name: "", last_name: "", division: "", district: "", user_type: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://60f2479f6d44f300177885e6.mockapi.io/users/" + id.replace(":", ""))
            .then(response => {
                setUser(response.data)
                setDivisionForShow(JSON.stringify(response.data.division).split("/")[0].replaceAll("\"",""))
            })
            .catch(error => {
                notify()
            });
    }, []);

    return (<div className="Tabs">
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Table className="center" cellPadding="4" cellSpacing="5">
                <TableBody>
                    <TableRow>
                        <td>Id: {user.id}</td>
                    </TableRow>
                    <TableRow>
                        <td>First Name: {user.first_name}</td>
                    </TableRow>
                    <TableRow>
                        <td>Last Name: {user.last_name}</td>
                    </TableRow>
                    <TableRow>
                        <td>Division: {divisionForShow}</td>
                    </TableRow>
                    <TableRow>
                        <td>City: {user.district}</td>
                    </TableRow>
                    <TableRow>
                        <td>User Type: {user.user_type}</td>
                    </TableRow>
                    <TableRow>
                        <td><Button onClick={()=>{navigate("/userEdit:" + user.id,{state:user})}}><EditIcon/>Edit User</Button></td>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        </div>)

}
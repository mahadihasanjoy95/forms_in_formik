import React, {useEffect, useState} from "react";
import {Box, Button, Table, TableBody, TableRow} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export default function UserDetailsPage(props) {
    let {id} = useParams();

    const [user, setUser] = useState({
        id: 0, first_name: "", last_name: "", division: "", district: "", user_type: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://60f2479f6d44f300177885e6.mockapi.io/users/" + id.replace(":", ""))
            .then(response => {
                setUser(response.data)
            });
    }, []);

    return (<div className="outlet">
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Table cellPadding="4" cellSpacing="5">
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
                        <td>Division: {user.division}</td>
                    </TableRow>
                    <TableRow>
                        <td>City: {user.district}</td>
                    </TableRow>
                    <TableRow>
                        <td>User Type: {user.user_type}</td>
                    </TableRow>
                    <TableRow>
                        <Button onClick={()=>{navigate("/userEdit:" + user.id,{state:user})}}>Edit User</Button>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
        </div>)

}
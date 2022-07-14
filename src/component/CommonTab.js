import React from "react";
import {Button, Paper, Table, TableBody, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom"
import PreviewIcon from '@mui/icons-material/Preview';

export default function CommonTab(props) {
    const navigate = useNavigate();
    const {users} = props
    let divisionForShow = ""
    return (
        <Paper style={{maxHeight: 400, overflow: 'auto'}}>
            <Table cellPadding="4" cellSpacing="5">
                <TableHead>
                    <TableRow>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Division</th>
                        <th>District</th>
                        <th>See Details</th>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user =>(
                        divisionForShow = JSON.stringify(user.division).split("/")[0].replace("\"",""),
                        <TableRow key={user.id}>
                            <td></td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{divisionForShow}</td>
                            <td>{user.district}</td>
                            <td><Button id={user.id} onClick={() => {
                                if (user.id===undefined){
                                    window.location.reload()
                                }else
                                    navigate("/userDetails:" + user.id)
                            }}><PreviewIcon/></Button></td>
                        </TableRow>))}
                </TableBody>
            </Table>
        </Paper>
    );
}
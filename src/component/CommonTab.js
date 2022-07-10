import React from "react";
import {Button, Fab, Icon, Paper, Table, TableBody, TableHead, TableRow} from "@mui/material";

export default function CommonTab(props) {
    const {users} = props
    return (
        <Paper style={{maxHeight: 400, overflow: 'auto'}}>
            <Table cellPadding="4" cellSpacing="5">
                <TableHead>
                    <TableRow>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Division</th>
                        <th>District</th>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user =>
                        <TableRow key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.division}</td>
                            <td>{user.district}</td>
                            {/*<tb><Fab></Fab></tb>*/}
                        </TableRow>)}
                </TableBody>
            </Table>
        </Paper>
    );
}
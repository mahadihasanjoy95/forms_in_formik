import React from "react";

export default function CommonTab(props) {
    const {users} = props
    return (<table cellPadding="4" cellSpacing="5">
        <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Division</th>
            <th>District</th>
        </tr>
        </thead>

        <tbody>
        {users.map(user => <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.division}</td>
            <td>{user.district}</td>
        </tr>)}
        </tbody>
    </table>);

}
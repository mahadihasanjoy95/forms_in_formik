import React from "react";
import {useLocation} from "react-router-dom";
import UserAddForm from "./UserAddForm";

export default function UserEditPage() {
    const {state} = useLocation();
    {console.log(state)}
    return (<div className="outlet">
        <UserAddForm user={state}/>
    </div>)

}
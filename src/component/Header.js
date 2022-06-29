import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";


export default function Header(props) {
    const navigate = useNavigate();
    return (
        <header className="block row center">
            <div>
                <a  href="/" onClick={()=>{navigate("/")}}>
                    <div className="row">
                    </div>
                </a>
            </div>

            <div>
                <button onClick={()=>{navigate("/signIn")}}>SignIn</button>
                <> </>
                <button href="/signUp" onClick={()=>{navigate("/signUp")}}>Register</button>
                <></>
            </div>
        </header>
    );
}
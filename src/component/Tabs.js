import React, {useEffect, useState} from "react";
import CommonTab from "./CommonTab"
import axios from "axios";
import CustomModal from "./CustomModal";

const Tabs = () => {

    const [activeTab, setActiveTab] = useState("tab1");
    const [users, setUsers] = useState([])

    const addUser = (u) => {
        if((activeTab==="tab1" && u.user_type==="employee")||(activeTab==="tab2" && u.user_type==="admin"))
            setUsers(oldArray => [...oldArray, u]);
    }
    const handleTab1 = () => {
        setActiveTab("tab1");
        fetchEmployees()
    };
    const handleTab2 = () => {
        setActiveTab("tab2");
        fetchAdmins()
    };

    const fetchAdmins = () => {
        axios.get("https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin").then(response => {
            setUsers(response.data)
        })
    }
    const fetchEmployees = () => {
        axios.get("https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee").then(response => {
            setUsers(response.data)
        })
    }
    useEffect(() => {
        activeTab === "tab1" ? fetchEmployees() : fetchAdmins()
    }, [])
    return (<div className="Tabs">
        <ul className="nav">
            <li onClick={handleTab1} className={activeTab === "tab1" ? "active" : ""}>Employees</li>
            <li onClick={handleTab2} className={activeTab === "tab2" ? "active" : ""}>Admins</li>
        </ul>
        <CustomModal addUser = {addUser}/>
        <div className="outlet">
            <CommonTab users={users}/>
        </div>
    </div>);
};
export default Tabs;
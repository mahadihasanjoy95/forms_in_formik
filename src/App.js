import './App.css';
import Tabs from "./component/Tabs";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import UserDetailsPage from "./component/UserDetailsPage";
import UserEditPage from "./component/UserEditPage";

function App() {
    return (<Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<Tabs/>}/>
                    <Route path="/userDetails:id" element={<UserDetailsPage/>}/>
                    <Route path="/userEdit:id" element={<UserEditPage/>}/>
                </Routes>
            </div>
        </Router>);
}

export default App;

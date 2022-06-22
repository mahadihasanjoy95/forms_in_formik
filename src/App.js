import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./component/Home";
import SignUpForm from "./component/SignUpForm";
import SignInForm from "./component/SignInForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/" element={<SignUpForm/>}/>
                <Route path="/signIn" element={<SignInForm/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

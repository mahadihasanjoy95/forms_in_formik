import React from 'react';
import Header from "./Header";
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignInForm() {

    const navigate = useNavigate();
    const MyTextInput = ({label, ...props}) => {
        const [field, meta] = useField(props);
        return (<>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
            </>);
    };
    return (

        <>
            <Header/>
            <br/>
            <Formik initialValues={{
                email: "", password: ""
            }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .required('Required'), password: Yup.string()
                            .required('Required')
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        return axios({
                            method: "POST", url: "http://localhost:8080/user/signIn", data: values,
                        })
                            .then(response => {
                                console.log(response)
                                localStorage.setItem("token", response.data.jwt)
                                (response.data.jwt.length>0?navigate("/player"):alert("Something Went Wrong!!"));
                            })
                            .catch(error => {
                                alert(error.response.data.message)
                                console.log(error)
                            });
                    }}>
                <Form>
                    <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />
                    <MyTextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="********"
                    />
                    <br/>
                    <button type="submit">LogIn</button>
                </Form>
            </Formik>

        </>);
}
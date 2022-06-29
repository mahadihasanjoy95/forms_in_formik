import React from 'react';
import Header from "./Header";
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";

export default function SignInForm(){

    const navigate = useNavigate();
    const MyTextInput = ({label, ...props}) => {
        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
            </>
        );
    };
    return(

        <>
            <Header/>
            <Formik initialValues={{
                email : "example@g.c",
                password : "abcdefg"
            }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .required('Required'),
                        password: Yup.string()
                            .required('Required')
                    })}
                    onSubmit={(values,{setSubmitting})=>{
                alert(JSON.stringify(values))
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
          
        </>
    );
}
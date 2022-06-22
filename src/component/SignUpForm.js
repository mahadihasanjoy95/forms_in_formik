import React from 'react';
import {Formik} from 'formik';
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup';

export default function SignUpForm() {


    const navigate = useNavigate();
    return (<Formik
            initialValues={{
                email: "priotababu@gmail.com", firstName: "Pri", lastName: "Joy", password: ""
            }}
            validationSchema={Yup.object({
                firstName:Yup.string().min(2,"Too Short").max(25,"Too Many").required("Required*"),
                lastName:Yup.string().min(2,"Too Short").max(25,"Too Many"),
                email:Yup.string().email("Wrong Email Format").required("Required*"),
                password: Yup.string()
                    .required('No password provided.')
                    .min(8, 'Password is too short - should be 8 chars minimum.')
                    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    navigate("/home")
                    alert(JSON.stringify(values,null,10))
                    setSubmitting(false);
                }, 400);
            }}>
            {formik => (<form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}<br/>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ?
                    <div>{formik.errors.firstName}</div> : null}<br/>
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName ?
                    <div>{formik.errors.lastName}</div> : null}<br/>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                />{formik.touched.password && formik.errors.password ?
                <div>{formik.errors.password}</div> : null}<br/>
                <button type="submit">Submit</button>
            </form>)}
        </Formik>

    );
}
import React from 'react';
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom'
export default function SignUpForm() {
    const validate = values => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'Required';
        } else if (values.firstName.length > 15) {
            errors.firstName = 'Must be 15 characters or less';
        }

        if (!values.lastName) {
            errors.lastName = 'Required';
        } else if (values.lastName.length > 20) {
            errors.lastName = 'Must be 20 characters or less';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "lala@g.c",
            firstName: "Mahadi Hasan",
            lastName:"Joy",
            password:"********"
        },
        validate
        ,
        onSubmit: values => {
            // console.log(formik.values.email, formik.values.firstName, formik.values.lastName, formik.values.password)
            navigate('/signIn',{replace: true})
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            /> <br/>{formik.errors.email ? <div>">{formik.errors.email}</div> : null}<br/>
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            /><br/>{formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}<br/>
            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            /><br/>{formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}<br/>
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name = "password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            /><br/>
            <button type="submit">Submit</button>
        </form>
    );
}
import React from 'react';
import {Formik} from 'formik';
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

        console.log(errors)
        return errors;
    };

    const navigate = useNavigate();
    // const formik = useFormik({
    //     initialValues: {
    //         email: "lala@g.c",
    //         firstName: "Mahadi Hasan",
    //         lastName:"Joy",
    //         password:"********"
    //     },
    //     validate
    //     ,
    //     onSubmit: values => {
    //         // console.log(formik.values.email, formik.values.firstName, formik.values.lastName, formik.values.password)
    //         navigate('/signIn',{replace: true})
    //     },
    // });
    return (
        <Formik initialValues={{
            email: "lala@g.c", firstName: "Mahadi Hasan",
            lastName: "Joy",
            password: "********"
        }}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 400);
                }}>
            {formik => (
                <form onSubmit={formik.handleSubmit}>
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
                    /><br/>
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>

    );
}
import React from "react";
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import axios from "axios";

export default function UserAddForm(props) {

    const MyTextInput = ({label, ...props}) => {
        const [field, meta] = useField(props);
        return (<>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        </>);
    };
    const MySelect = ({label, ...props}) => {
        const [field, meta] = useField(props);
        return (<div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        </div>);
    };
    return (<div>
        <Formik initialValues={{
            first_name: "", last_name: "", district: "", division: "", user_type: ""
        }}
                validationSchema={Yup.object({
                    first_name: Yup.string()
                        .required('Required'), last_name: Yup.string()
                        .required('Required'), user_type: Yup.string()
                        .oneOf(['admin', 'employee'], 'Invalid User Type')
                        .required('Required'),
                })}
                onSubmit={(values, {setSubmitting}) => {
                    return axios({
                        method: "POST", url: "https://60f2479f6d44f300177885e6.mockapi.io/users", data: values,
                    })
                        .then(response => {
                            console.log("User Added")
                            alert("User Added")
                            window.location.reload()
                        })
                        .catch(error => {
                            alert(error.response.data.message)
                            console.log(error)
                        });
                }}>
            <Form>
                <MyTextInput
                    label="First Name"
                    name="first_name"
                    type="text"
                    placeholder="John"
                />
                <br/>
                <MyTextInput
                    label="Last Name"
                    name="last_name"
                    type="text"
                    placeholder="Doe"
                />
                <br/>
                <MyTextInput
                    label="District"
                    name="district"
                    type="text"
                    placeholder="Dhaka"
                />
                <br/>
                <MyTextInput
                    label="District"
                    name="division"
                    type="text"
                    placeholder="Dhaka"
                />
                <MySelect label="User Type" name="user_type">
                    <option value="">Select Your User Type</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                </MySelect>
                <br/>
                <br/>
                <button type="submit">Add</button>
            </Form>
        </Formik>
    </div>);
}
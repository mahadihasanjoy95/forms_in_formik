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
            firstName: "", lastName: "", district: "", division: "", userType: ""
        }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .required('Required'), lastName: Yup.string()
                        .required('Required'), userType: Yup.string()
                        .oneOf(['admin', 'employee'], 'Invalid User Type')
                        .required('Required'),
                })}
                onSubmit={(values, {setSubmitting}) => {
                    return axios({
                        method: "POST", url: "http://localhost:8080/user/signIn", data: values,
                    })
                        .then(response => {
                        })
                        .catch(error => {
                            alert(error.response.data.message)
                            console.log(error)
                        });
                }}>
            <Form>
                <MyTextInput
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="John"
                />
                <br/>
                <MyTextInput
                    label="Last Name"
                    name="lastName"
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
                <MySelect label="User Type" name="userType">
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
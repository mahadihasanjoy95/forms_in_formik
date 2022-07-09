import React, {useEffect, useState} from "react";
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {Country, State, City} from 'country-state-city';


export default function UserAddForm(props) {
    const {addUser,handleClose} = props
    const updatedStates = State.getStatesOfCountry('BD');
    const cities = City.getCitiesOfCountry('BD');

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
                    first_name: Yup
                        .string()
                        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                        .max(40)
                        .required("First Name Required"),
                    last_name: Yup
                        .string()
                        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                        .max(40)
                        .required("Last Name Required"),
                    user_type: Yup.string()
                        .oneOf(['admin', 'employee'], 'Invalid User Type')
                        .required('User Type Required'),
                    district: Yup
                        .string()
                        .max(100),
                    division: Yup
                        .string()
                        .max(100),
                })}
                onSubmit={(values, {setSubmitting}) => {
                    return axios({
                        method: "POST", url: "https://60f2479f6d44f300177885e6.mockapi.io/users", data: values,
                    })
                        .then(response => {
                            alert("User Added")
                            addUser(values)
                            handleClose()
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
                <MySelect label="District" name="division">
                    <option value="">Select Your Division</option>
                    {updatedStates.map((state) => (<option value={state.name}>{state.name}</option>))}
                </MySelect>
                <MySelect label="City" name="district">
                    <option value="">Select Your District</option>
                    {cities.map((city) => (<option value={city.name}>{city.name}</option>))}
                </MySelect>
                <MySelect label="User Type" name="user_type">
                    <option value="">Select Your User Type</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                </MySelect>
                <br/>
                <button type="submit">Add</button>
            </Form>
        </Formik>
    </div>);
}
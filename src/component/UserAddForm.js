import React, {useState} from "react";
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {City, State} from 'country-state-city';
import {useNavigate} from "react-router-dom";


export default function UserAddForm(props) {

    const {user,addUser, handleClose, editUser, page} = props
    const updatedStates = State.getStatesOfCountry('BD');
    const cities = City.getCitiesOfCountry('BD');
    const navigate = useNavigate();

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
            first_name: user.first_name, last_name: user.last_name, district: user.district, division: user.division, user_type: user.user_type
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
                    if (page==="add"){
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
                    }else{
                        return axios({
                            method: "PUT", url: "https://60f2479f6d44f300177885e6.mockapi.io/users/"+user.id, data: values,
                        })
                            .then(response => {
                                alert("User Edited")
                                navigate("/")

                            })
                            .catch(error => {
                                alert(error.response.data.message)
                                console.log(error)
                            });
                    }
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
                {page==="add"?(<button type="submit">Add</button>):(<button type="submit">Edit</button>)}
            </Form>
        </Formik>
    </div>);
}
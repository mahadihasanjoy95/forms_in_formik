import React, {useEffect, useRef, useState} from "react";
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {City, State} from 'country-state-city';
import {useNavigate} from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';

export default function UserAddForm(props) {

    const {user, addUser, handleClose, page} = props
    let updatedStates = State.getStatesOfCountry('BD');
    let cities = City.getCitiesOfCountry('BD');
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
    const [disabled, setDisabled] = useState(false);
    useRef();
    const [division, setDivision] = useState({});
    useEffect(() => {
        let stateCode = JSON.stringify(division);
        stateCode = stateCode.substring(stateCode.indexOf("/") + 1).replaceAll("\"","");
        cities = City.getCitiesOfState("BD", stateCode)
    }, [division]);
    return (<div>

        <Formik
            enableReinitialize={true}
            initialValues={{
                first_name: user.first_name,
                last_name: user.last_name,
                district: user.district,
                division: user.division,
                user_type: user.user_type,
                stateCode : null,
                id:null
            }}
            validationSchema={Yup.object({
                first_name: Yup
                    .string().trim()
                    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                    .max(40)
                    .required("First Name Required"), last_name: Yup
                    .string().trim()
                    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                    .max(40)
                    .required("Last Name Required"), user_type: Yup.string()
                    .oneOf(['admin', 'employee'], 'Invalid User Type')
                    .required('User Type Required'), district: Yup
                    .string()
                    .max(100), division: Yup
                    .string()
                    .max(100),
            })}
            onSubmit={(values, {setSubmitting}) => {
                setDisabled(true);
                if (page === "add") {
                    return axios({
                        method: "POST", url: "https://60f2479f6d44f300177885e6.mockapi.io/users", data: values,
                    })
                        .then(response => {
                            values.id = response.data.id
                            addUser(values)
                            handleClose()
                        })
                        .catch(error => {
                            console.log(error)
                        });
                } else {
                    return axios({
                        method: "PUT",
                        url: "https://60f2479f6d44f300177885e6.mockapi.io/users/" + user.id,
                        data: values,
                    })
                        .then(response => {
                            navigate("/")

                        })
                        .catch(error => {
                            console.log(error)
                        });
                }
            }}
            innerRef={(formikActions) => formikActions ? setDivision(formikActions.values.division) : setDivision({})}>
            {(props) => (<Form>
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
                <MySelect label="Division" name="division">
                    <option value="">Select Your Division</option>
                    {updatedStates.map((state) =>
                        state.isoCode === "06" || state.isoCode === "B"
                    || state.isoCode === "13" || state.isoCode === "27"
                    || state.isoCode === "34" || state.isoCode === "54"
                    || state.isoCode === "55" || state.isoCode === "60" ?
                        <option key={state.isoCode} value={state.name+"/"+state.isoCode}>{state.name}</option> : null)}
                </MySelect>
                <MySelect label="District" name="district">
                    <option value="">Select Your District</option>
                    {cities.map((city) => (
                        <option key={city.latitude + city.longitude} value={city.name}>{city.name}</option>))}
                </MySelect>
                <MySelect label="User Type" name="user_type">
                    <option value="">Select Your User Type</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                </MySelect>
                <br/>
                {page === "add" ? (<button disabled={disabled} type="submit"><AddCircleIcon/></button>) : (
                    <button type="submit"><EditAttributesIcon/></button>)}
            </Form>)}
        </Formik>
    </div>);
}
import React from 'react';
import { Formik, Form, Field } from 'formik';

export default function Home() {
   return(
       <div>
           <h1>Social Profiles</h1>
           <Formik
               initialValues={{
                   social: {
                       facebook: '',
                       twitter: '',
                   },
               }}
               onSubmit={values => {
                   // same shape as initial values
                   console.log(values);
               }}
           >
               <Form>
                   <Field name="social.facebook"/>
                   <Field name="social.twitter"/>
                   <button type="submit">Submit</button>
               </Form>
           </Formik>
       </div>
   )
}
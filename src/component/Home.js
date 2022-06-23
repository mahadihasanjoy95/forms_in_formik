import React from 'react';
import { Formik, Form, Field } from 'formik';
import ReactPlayer from 'react-player'
import Player from './Player'

export default function Home() {
   return(
       <div>
           <h1>Training Pro</h1>
           <Player />
       </div>
   )
}
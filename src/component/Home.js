import React from 'react';
import Player from './Player'
import SignUpForm from "./SignUpForm";
import Header from "./Header";

export default function Home() {
   return(
       <div>
           <Header/>
           <SignUpForm />
       </div>
   )
}
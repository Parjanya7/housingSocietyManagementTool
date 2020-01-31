
import React, { useState } from 'react';
import '../../Styles/signup.css';
import '../../Styles/button.css';
import {
    Link,
    useHistory       
  } from "react-router-dom";
import axios from 'axios';

const AdminSignUp = ( props ) => {

    const [ userNameVal, setUserNameVal ] = useState('');
    const [ nameVal, setNameVal] = useState( '' );
    const [ emVal, setEVal ]  = useState( '' );
    const [ passVal, setPassVal] = useState( '' );
    const [ mnVal, setMNVal] = useState( '' );

    let history = useHistory();

    const submitFunc = () => {

        let formDataVar = {
            'UserName': userNameVal,
            'Name': nameVal,
            'Email': emVal,
            'Password': passVal,
            'MobileNo': mnVal,
            'Access': 'Admin'
        };

        axios.post('/auth/SignUp', formDataVar )
            .then( res => {
                if( res.data.entryVar === true ) {
                    alert( res.data.msg );
                    props.updateUser( res.data.user );
                    history.push('/');
                }
                else {

                    if(res.data.errors.username) alert(res.data.errors.username);
                    if(res.data.errors.name) alert(res.data.errors.name);
                    if(res.data.errors.email) alert(res.data.errors.email);
                    if(res.data.errors.mobile) alert(res.data.errors.mobile);
                    if(res.data.errors.password) alert(res.data.errors.password);
                }
            }).catch(err => console.log(err));         
    };

    return (
        
        <div className = 'display'>
            <div className='containerSignUp'>
                <h2 className='signup'>Admin Sign Up</h2>

                <form>
                    
                    <input className='input' type = 'text' placeholder = 'Userame ' name = 'username' value = {userNameVal} 
                        onChange = { e => { setUserNameVal( e.target.value ) } } autoFocus 
                    /> <br/>
                    <input className='input' type = 'text' placeholder = 'Name' name = 'name' value = {nameVal} 
                        onChange = { e => { setNameVal( e.target.value ) } } 
                    /> <br/>
                    
                    <input className='input' type = 'email' placeholder = 'Email' name = 'email' value = {emVal} 
                        onChange = { e => { setEVal( e.target.value ) } }
                    /> <br/>
                    
                    <input className='input' type = 'password' placeholder = 'Password' name = 'password' value = {passVal} 
                        onChange = { e => { setPassVal( e.target.value ) } }
                    /> <br/>
                    
                    <input className='input' type = 'number' placeholder = 'Mobile Number' name = 'number' value = {mnVal} 
                        onChange = { e => { setMNVal( e.target.value ) } }
                    /> <br/>

                    <div className='button'>
                        <button onClick = { submitFunc } type = "button" name = 'signUpButton'> Sign Up </button>
                    </div>
                    
                </form>

                <div style = {{ marginTop: '6rem', textAlign: 'center'}} >
                    <p>Already have an Account ? </p> 
                    <Link to = "/" id = "link"> Login </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminSignUp;

import React, { useState } from 'react';
import '../Styles/login.css';
import '../Styles/button.css'
import {
    Link,
    useHistory
  } from "react-router-dom";
import axios from 'axios';

const LoginForm = ( props ) => {

    let history = useHistory();

    const [ userVal, setUserVal ] = useState( props.user );
    const [ passVal, setPassVal ] = useState('');
    const [ access, setAccess ] = useState('');
    
    const someFunc = () => { 

        if( access === '')
            alert('Select from Member or Admin.');

        else {
            axios.post('auth/Login', { Name: userVal, Password: passVal, Access: access })
            .then( res => {

                if( res.data.entryVar ) {
                    
                    alert(res.data.msg);
                    props.updateUser( res.data.user );
                    if( res.data.Access === 'Admin' )  
                        history.push('/AdminMain');
                    if( res.data.Access === 'Member' )
                        history.push('/MemberMain');
                }
                else if( res.data.entryVar === false ) {
                    
                    alert( res.data.msg );
                }
                else {

                    console.log( res.data );
                    if(res.data.Name) alert(res.data.Name);
                    if(res.data.Password) alert(res.data.Password);
                }
            }).catch(err => alert(err));
        }
    };

    return (
        
        <div className = 'display'>
            <div className='containerLogin'>
                <h1 className='login'> Login </h1>

                <form>

                    <div style = {{ display:'flex', marginTop:'-2rem', textAlign:'center', textAlignLast:'center'}}>
                    <input
                        type = 'radio'
                        name = 'access'
                        onChange = { () => setAccess('Member') }
                    />  <b style = {{marginRight:'5rem', marginTop:'-0.1rem'}}>Member </b>
                    <input
                        type = 'radio'
                        name = 'access'
                        onChange = { () => setAccess('Admin') }
                    /> <b style = {{marginTop:'-0.1rem'}}>Admin</b>
                    </div>
                    <br/>

                    <input className='input' 
                    type = "text" 
                    name = "username" 
                    value = { userVal } 
                    placeholder = "Username" 
                    autoFocus
                    id = 'UserName'
                        onChange = { e => { setUserVal( e.target.value ) } }
                    />

                    <br/>

                    <input className='input' type = "password" name = "password" value = { passVal } placeholder = "Password" 
                        onChange = { e => { setPassVal( e.target.value ) } }
                    />
                    <p className="forgotPassword"> Forgot Password ? </p> 
                    
                    <br/>
                    <div className='button'>
                        <button type = "button" onClick = {someFunc} > Login </button>
                    </div>

                </form>

                <div style = {{ marginTop: '10rem', textAlign: 'center'}}>
                    <p> Don't have an Account ?</p> <Link to = "/SignUp" id = "link"> SignUp </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;

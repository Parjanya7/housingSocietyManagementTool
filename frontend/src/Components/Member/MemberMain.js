import React, { Component } from 'react';
import {
    Route,
    NavLink,
    Switch
} from "react-router-dom";
import '../../Styles/style.scss';
import Login from '../Login';
import MemberDashboard from './MemeberDashboard';
import MemberPayments from './MemberPayments';

const MemberMain = ( props ) => {

    let match = props.match;

    const style = {          
        
        height:'100px',
        lineHeight:'100px',
        fontSize: 'larger',
        display: 'block',
        padding: '40px 16px',
        margin: '0rem',
        color: 'inherit', 
        textDecoration: 'inherit' 
    };

    const active = { backgroundColor : 'royalblue'};

    const updateUserFunc = () => {
        props.updateUser('');
    };

    return (
         
    <div className = 'Container' >
        <div className = "navDiv">
                <ul id = "uli" >
                    <h3 style = {{marginBottom:'5rem'}}><u> Member </u></h3>
                    <li><NavLink to = { `${match.url}/dashboard` } style = { style } activeStyle = {active}> Dash Board </NavLink></li>
                    <li><NavLink to = {`${match.url}/payments`} style = { style } activeStyle = {active}> Payments </NavLink></li>
                    <NavLink to ='/' id = "LogOutId" onClick = { updateUserFunc }> LogOut </NavLink>
                </ul>
        </div>
        <div>
            <Route exact path = {`${match.url}/dashboard`} component = { MemberDashboard }/>
            <Route path = {`${match.url}/payments`} component = { () => <MemberPayments user = {props.user}/> } />
            <Route exact path = '/' component = {Login} />
        </div>        
    </div>     
        
    )
}

export default MemberMain;

import React, { Component } from 'react';
import {
    Route,
    NavLink,
    Switch
} from "react-router-dom";
import '../../Styles/style.scss';
import Houses from './Houses';
import Login from '../Login';
import AdminDashboard from './AdminDashboard';
import Residents from './Residents';
import Mantainance from './Mantainance';

const AdminMain = ( props ) => {

    let match = props.match;

    const style = {          
        
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
                <ul id = "uli">
                    <u><h3 style = {{marginBottom:'3rem'}}> Administrator </h3></u>
                    <li><NavLink to = { `${match.url}/dashboard` } style = { style } activeStyle = {active}> Dash Board </NavLink></li>
                    <li><NavLink to = {`${match.url}/houses`} style = { style } activeStyle = {active}> Houses </NavLink></li>
                    <li><NavLink to = {`${match.url}/residents`} style = { style } activeStyle = {active}> Residents </NavLink></li>
                    <li><NavLink to = {`${match.url}/mantainance`} style = { style } activeStyle = { active} > Mantainance </NavLink></li>
                    <NavLink to ='/' id = "LogOutId" onClick = { updateUserFunc }> LogOut </NavLink>
                </ul>
        </div>
        <div>
            <Route exact path = {`${match.url}/dashboard`} component = { AdminDashboard }/>
            <Route path = {`${match.url}/houses`} component = {() => <Houses/>} />
            <Route path = {`${match.url}/residents`} component = {() => <Residents/>} />
            <Route path = {`${match.url}/mantainance`} component = {() => <Mantainance/>} />
            <Route exact path = '/' component = {Login} />
        </div>        
    </div>     
        
    )
}

export default AdminMain;

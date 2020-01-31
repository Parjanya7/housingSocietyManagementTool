import React from 'react';
import {
    Route,
    NavLink,
} from "react-router-dom";
import AdminSignUp from './Admin/AdminSingUp';
import MemberSignUp from './Member/MemberSignUp';

const AdminOrMemberSignUp = (props) => {

    let match = props.match;

    const style = {          
        
        fontSize: 'medium',
        display: 'inline',
        padding: '5px',
        margin: '1rem',
        width:'800px',
        height:'20px',
        color: 'inherit', 
        textDecoration: 'underline',
        fontWeight:'bold', 
        borderRadius: '5px'
    };

    const active = { backgroundColor : 'royalblue', boxShadow: '5px 5px 2px gray'};

    return (
        <div>
            <div style = {{ textAlign:'center', display:'flex'}}>
                <ul style = {{ display:'flex', textAlign:'center'}}>
                    <li style = {{height:'20px', marginRight:'2rem'}} ><NavLink to =  {`${match.url}/Admin`}  style = { style } activeStyle = {active} > Admin SignUp </NavLink></li>
                    <li style = {{height:'20px'}}><NavLink to = {`${match.url}/Member`} style = { style } activeStyle = {active}> Member SignUp </NavLink></li>
                </ul>
            </div>
            <div>
               <Route exact path = {`${match.url}/Admin`}  component = { () => <AdminSignUp user = {props.user} updateUser = {props.updateUser}/> } />
               <Route path = {`${match.url}/Member`} component = { () => <MemberSignUp user = {props.user} updateUser = {props.updateUser}/> } />
            </div>    
        </div>
    )
}

export default AdminOrMemberSignUp;

import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {

    const [ notice, setNotice ] = useState('');
    const [ meeting, setMeeting ] = useState('');

    const saveNotice = () => {

        if( meeting === '' && notice === '' )
            alert('Empty Input');
        else{

            axios.post('/setMeetings', { Meetings: meeting, Notices: notice})
            .then( res => {

                alert(res.data.msg);
                setMeeting('');
                setNotice('');
            });
        }
    };

    return (
        <div>
            <h1 style = {{ marginTop:'0rem', marginLeft:'3rem', textAlign:'center'}}><u> Post Notices and Updates </u></h1>
            <form style = {{textAlign:'center', display:'inline', marginLeft:'3rem'}}>
                <div style = {{display:'flex', marginTop:'2rem', alignContent:'center', width:'150vh', marginLeft:'3rem'}}>
                    <b style = {{marginTop:'3.5rem', fontSize:'200%'}}><i>Notices: </i></b>
                    <span>&nbsp;&nbsp;</span>
                    <textarea 
                        placeholder = ' Notices and Urgent updates'
                        name = 'Notices' 
                        rows = '4'
                        value = { notice }
                        onChange = { e => setNotice(e.target.value) } 
                        style = {{width:'100%', borderRadius:'5px', boxShadow:'5px 5px 5px gray', fontSize:'250%', marginBottom:'3rem'}}/>
                </div>
                <div style = {{display:'flex', marginTop:'2rem', alignContent:'center', width:'150vh', marginLeft:'3rem'}}>
                    <b style = {{marginTop:'3.5rem', fontSize:'200%'}}><i>Meetings: </i></b>
                    <span>&nbsp;&nbsp;</span>
                    <textarea 
                        placeholder = 'Meeting and Why'
                        name = 'Meetings' 
                        rows = '4' 
                        value = { meeting }
                        onChange = { e => setMeeting(e.target.value) }
                        style = {{width:'100%', borderRadius:'5px', boxShadow:'5px 5px 5px gray', fontSize:'250%', marginBottom:'3rem'}}/>
                </div>
                <div className='button'>
                        <button type = "button" onClick = {saveNotice} > POST </button>
                    </div>

            </form>
        </div>
    )
}

export default AdminDashboard;

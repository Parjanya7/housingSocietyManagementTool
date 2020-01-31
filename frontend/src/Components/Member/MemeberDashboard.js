import React,{ useState, useEffect } from 'react';
import axios from 'axios';

const MemeberDashboard = () => {

    const [ meeting, setMeeting ] = useState([]);
    const [ notice, setNotice ] = useState([]);

    useEffect( () => {

        axios.get('/member/feed')
        .then( res => {
            
            meeting.length = 0;
            notice.length = 0;

            let meet = [];
            let not = [];

            console.log( res.data );
            for( let i = 0; i < res.data.length; i++ ) {

                meet[i] = <li style = {{fontWeight:'bolder', fontSize:'larger', marginBottom:'4rem'}}>{ res.data[i].Meeting }</li>
                not[i] = <li style = {{fontWeight:'bolder', fontSize:'larger', marginBottom:'4rem'}}>{ res.data[i].Notice }</li>
            }
            setMeeting(meeting.concat(meet));
            setNotice(notice.concat(not));
        });
    }, []);

    return (
        <div>
            <h1 style = {{ textAlign:'center'}}><u> Daily Feeds </u></h1>
            <div 
                style = {
                    {
                        width:'180vh', 
                        height:'42vh', 
                        marginTop:'0.5rem',
                        overflowX:'auto',
                        marginBottom:'0.5rem',
                        boxShadow:'-5px 5px 5px 5px gray'
                    }
                }
            >
                <h2 style = {{textAlign:'center', marginTop:'0rem'}}><i> Notices </i></h2>
                <ul>
                {notice}
                </ul>
            </div>
            <div style = {
                    {
                        width:'180vh', 
                        height:'42vh',  
                        marginBottom:'0.5rem', 
                        overflowX:'auto',
                        boxShadow:'-5px 5px 5px 5px gray',
                    }
                }
            >
                <h2 style = {{textAlign:'center', marginTop:'0rem'}}><i> Meetings </i></h2>
                <ul>
                {meeting}
                </ul>
            </div>
        </div>
    )
}

export default MemeberDashboard;

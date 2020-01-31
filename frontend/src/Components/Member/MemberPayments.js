import React, { useState, useEffect } from 'react'
import axios from 'axios';

const MemberPayments = (props) => {
    
    const [mantChrg, setMantChrg ] = useState('');
    const [parkChrg, setParkChrg ] = useState('');
    const [festChrg, setFestChrg ] = useState('');
    const [otherChrg, setOtherChrg ] = useState('');
    const [total, setTotal] = useState('');

    useEffect( () => {
        
        axios.post('/getPaymentDetails', { user: props.user })
        .then( res => {

            console.log( res.data );
            if( res.data.Payment !== 0 ) {

                if( res.data.Payment.man ) setMantChrg( res.data.Payment.man );
                if( res.data.Payment.park ) setParkChrg( res.data.Payment.park );
                if( res.data.Payment.fest ) setFestChrg( res.data.Payment.fest );
                if( res.data.Payment.other ) setOtherChrg( res.data.Payment.other );
            }
            else {

                setMantChrg(0);
                setFestChrg(0);
                setParkChrg(0);
                setOtherChrg(0);
            }
        });
    }, []);

    const makeTotal = () => {

        setTotal('');
        setTotal( Number(mantChrg) + Number(parkChrg) + Number(festChrg) + Number(otherChrg) );
    };

    return (
        <div>
            <h1 style = {{ textAlign:'center', marginBottom:'5rem'}}><u> Due Payments </u></h1>
            <div style = {{textAlign:'center', width:'180vh', marginBottom:'5rem'}}>
            <div>
            <fieldset id = "name">
                <legend style = {{ textAlign:'left'}}> Mantainance Charges </legend>
                <input 
                    placeholder = "Mantainance Charges"
                    type = "number" 
                    name = "Name" 
                    style = {{textAlign:'right', textAlignLast:'right'}}
                    value = { mantChrg }
                    id = "1" 
                    readOnly
                    onChange = { e => { setMantChrg( e.target.value )} }
                />
            </fieldset>
            </div>
            <div>   
            <fieldset id = "name">
                <legend style = {{ textAlign:'left'}}> Parking Charges </legend>
                <input 
                    placeholder =  "Parking Charges"
                    type = "number" 
                    name = "Name" 
                    style = {{textAlign:'right', textAlignLast:'right'}}
                    value = { parkChrg }
                    id = "2" 
                    readOnly
                    onChange = { e => { setParkChrg( e.target.value )} }
                />
            </fieldset>
            </div>
            <div>
            <fieldset id = "name">
                <legend style = {{ textAlign:'left'}}> Festival Charges </legend>
                <input 
                    placeholder = "Festival Charges"
                    type = "number" 
                    name = "Name" 
                    style = {{textAlign:'right', textAlignLast:'right'}}
                    value = { festChrg }
                    id = "3" 
                    readOnly
                    onChange = { e => { setFestChrg( e.target.value )} }
                />
            </fieldset>
            </div>
            <div>
            <fieldset id = "name">
                <legend style = {{ textAlign:'left'}}> Other Charges </legend>
                <input 
                    placeholder = "Other Charges"
                    type = "number" 
                    name = "Name" 
                    style = {{textAlign:'right', textAlignLast:'right'}}
                    value = { otherChrg }
                    id = "4" 
                    readOnly
                    onChange = { e => { setOtherChrg( e.target.value )} }
                />
            </fieldset>
            </div>
            <div style = {{display:'flex'}}>
                <button 
                        type = "button"
                        name = "Total"
                        onClick = { makeTotal }
                        style = {{height:'45px', marginRight:'2rem',marginLeft:'24rem'}}
                    > 
                        Total
                </button>
                <h1 style = {{ marginLeft: '10rem', marginTop:'0.5rem'}}>{total}</h1>
            </div>
            </div>
            <div>
                <h1 style = {{ textAlign:'center'}}> Payment Gateway may be added here. </h1>
            </div>
        </div>
    )
}

export default MemberPayments

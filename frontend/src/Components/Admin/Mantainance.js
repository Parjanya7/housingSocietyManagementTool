import React,{useState, useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';

const Mantainance = () => {

    const [houseNo, setHouseNo] = useState('');
    const [mantChrg, setMantChrg ] = useState('');
    const [parkChrg, setParkChrg ] = useState('');
    const [festChrg, setFestChrg ] = useState('');
    const [otherChrg, setOtherChrg ] = useState('');
    const [total, setTotal] = useState('');
    const [selectedOption, setSelectedOption ] = useState(null);
    const [ option, setOption ] = useState([]);

    useEffect( () => {

        findByNameFunc();
    }, []);

    const stylesForFindByName = {

        control : () => ({
                        
            display:'flex',
            border:'1px solid black',
            borderRadius:'4rem',
            boxShadow:'5px 5px 5px gray',
        }),
        dropdownIndicator : () => ({
            
            float:'right',
            color:'black',
            marginLeft:'5px',
            padding:'5px',
            marginRight:'10px'
        })  
    };

    const Fetch = () => {

        if( houseNo ) {
 
            axios.post( '/mantainance/detailsbyId', { houseNo: houseNo })
            .then( res => {

                for( let i = 0; i < option.length; i++ ) {

                    if( houseNo == option[i].ID )
                        setSelectedOption(option[i]);
                }

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
        }
    };

    const makeTotal = () => {

        setTotal('');
        setTotal( Number(mantChrg) + Number(parkChrg) + Number(festChrg) + Number(otherChrg) );
    };

    const updatePayment = () => {

        if( !total ) alert('Please make a Total.');
        else {

            axios.post('/mantainance/updatePayment', { 
                houseNo: houseNo,
                total: total,
                man: mantChrg,
                park: parkChrg,
                fest: festChrg,
                other: otherChrg
            }).then( res => {

                alert( res.data.msg );
                setSelectedOption('');
                setHouseNo('');
                setMantChrg('');
                setFestChrg('');
                setParkChrg('');
                setOtherChrg('');
                setTotal('');
            });
        }
    };

    const findByNameFunc = () => {

        option.length = 0;

        let theVar = '';        
        
        axios.post('/house/findByName', { keyWord : theVar } )
            .then( res => {
                
                let names = new Array( res.data.length );

                console.log( res.data );

                for( let i = 0; i < res.data.length; i++ ) {
                    names[i] = { value: res.data[i].houseName, label: res.data[i].houseName, ID : res.data[i].houseNo };           
            }
            setOption( option.concat( names ) );
        });
    };   
    
    const getDataByName = (selectedOption) => {

        if( selectedOption !== null ) {

            setSelectedOption( selectedOption );

            axios.post( '/mantainance/detailsbyId', { houseNo: selectedOption.ID })
            .then( res => {

                setHouseNo( selectedOption.ID );

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
        }
        else {
            setSelectedOption('');
            setHouseNo('');
            setMantChrg('');
            setFestChrg('');
            setParkChrg('');
            setOtherChrg('');
            setTotal('');
        }
    }; 

    return (
        <div>
            <h1 style = {{ marginTop:'0rem', marginLeft:'19rem', textAlign:'center'}}><u> Mantainance and Payments </u></h1>

            <div style = {{display:'flex', marginTop:'3rem'}}>
                <fieldset id = "Id">
                        <legend> HNo. </legend>
                    <input
                        id = "ID"
                        type = "number"
                        name = "ID"
                        value = {houseNo}
                        onChange = { e => setHouseNo(e.target.value) }
                    />
                </fieldset>
                <button 
                    type = "button"
                    name = "Fetch"
                    onClick = { Fetch }
                    style = {{height:'45px', marginRight:'2rem'}}
                > 
                    Find
                </button>
                <Select 
                        id = "selectID"
                        isSearchable     
                        placeholder = ' Search Houses Payment Details By House Names '
                        value = { selectedOption }
                        onChange = { getDataByName }
                        options = { option }
                        maxMenuHeight = {140}
                        openMenuOnClick = { false }
                        styles = { stylesForFindByName }
                        isClearable = {true}
                />
            </div>
            <div style = {{textAlign:'center', marginTop:'3rem', marginLeft:'14rem'}}>
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
                    onChange = { e => { setOtherChrg( e.target.value )} }
                />
            </fieldset>
            </div>
            <div style = {{display:'flex'}}>
                <button 
                        type = "button"
                        name = "Total"
                        onClick = { makeTotal }
                        style = {{height:'45px', marginRight:'2rem',marginLeft:'6.5rem'}}
                    > 
                        Total
                </button>
                <h1 style = {{ marginLeft: '10rem', marginTop:'0.5rem'}}>{total}</h1>
            </div>
            <div style = {{textAlign:'center', marginTop:'3rem', marginRight:'3rem'}}>
            <button 
                        type = "button"
                        name = "update"
                        onClick = { updatePayment }
                        style = {{height:'45px', marginRight:'2rem',marginLeft:'6.5rem'}}
                    > 
                        Post Payment
                </button>
            </div>
            </div>
        </div>
    )
}

export default Mantainance;

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../../Styles/style.scss';

const Houses = () => {

    const [houseName, setHouseName] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [findRecord, setFindRecord] = useState('');
    const [edit, setEdit] = useState( true );
    const [mobileNo, setMobileNo] = useState('');
    const [addr, setAddr] = useState('');
    const [phNo, setPhNo] = useState('');
    const [postal, setPostal] = useState('');
    const [phCode, setPhCode] = useState('');
    const [houseimg, setHouseImg] = useState('');
    const [fetched, setFetched] = useState(false);
    const [selectedOption, setSelectedOption ] = useState(null);
    const [ option, setOption ] = useState([]);
    const [ prevImg, setPrevImg ] = useState('');
    const [ prevImgVar, setPrevImgVar ] = useState( false );

    useEffect( () => {

        axios.get('/house/connect')
            .then( res => setHouseNo( res.data.ID ));

        findByNameFunc();
    }, [] );

    //INSERT REQUEST
    const Insert = async() => {

        let insertData = createFormData();

        await axios.post('/house/insert' , insertData ).then( res => {

            alert(`Record Created Successfully with ID: ${ res.data.ID } and Name: ${ res.data.Name }`);
        });

        await New(); 
    };

    //DELETE REQUEST
    const Delete = () => {

        if(!fetched)
            alert('Fetch Details before deleting.');
        
        else {
            
            axios.post('/house/delete', {

                Id : houseNo
            }).then( res => alert( `Successfully Delete Record with house number : ${ res.data } ` ) );

            New();
        }
    };  

    //UPDATE REQUEST
    const Update = async() => {

        if(fetched){

            let updatedData = createFormData();

            alert( updatedData.get('image') );

            await axios.post( '/house/update', updatedData )
                .then( res => alert( `Updated record with ID: ${res.data.ID}` ) );
    
            await New();
        }
    };

    //FETCH REQUEST
    const Fetch = () => {

        if(findRecord) {

            axios.post('/house/find' , {

                Id : findRecord
            }).then( res => {

                console.log( res.data );

                if( res.data.img ===  null || res.data.img === undefined ) {
                 
                    setHouseNo( res.data.houseNo );
                    setHouseName( res.data.houseName );
                    setAddr( res.data.Address );
                    setMobileNo( res.data.MobileNo );
                    setPostal( res.data.PostalCode );
                    setPhCode( res.data.phCode );
                    setHouseImg('');
                    setPhNo( res.data.PhoneNo ); 
                    setFindRecord('');
                }
                else {

                    var base64Flag = 'data:image/jpeg;base64,'; 
                    var imageStr = arrayBufferToBase64( res.data.img.data );

                    setHouseNo( res.data.houseNo );
                    setHouseName( res.data.houseName );
                    setAddr( res.data.Address );
                    setMobileNo( res.data.MobileNo );
                    setPostal( res.data.PostalCode );
                    setPhCode( res.data.phCode );
                    setPhNo( res.data.PhoneNo ); 
                    setFindRecord('');
                    setHouseImg( base64Flag + imageStr );
                }
            setFetched( true );   
            }); 
        }
    };

/*    const editClick = () => {

        setEdit(!edit);
        if(!edit)document.getElementById('Name').focus();
    }; */

    const New = () => {

        axios.get('/house/connect')
            .then( res => setHouseNo( res.data.ID ));

        findByNameFunc();

        setHouseName('');
        setHouseImg('');
        setAddr('');
        setMobileNo('');
        setPostal('');
        setPhCode('');
        setPhNo('');
        setFindRecord('');
        setSelectedOption('');
        setPrevImg('');
        setPrevImgVar( false );
        option.length = 0;
    };

    const arrayBufferToBase64 = ( buffer ) => {
        
        var binary = '';

        var bytes = [].slice.call( new Uint8Array( buffer ) );
        
        bytes.forEach( ( b ) => binary += String.fromCharCode( b ) );
        
        return window.btoa(binary);
    };

    const createFormData = () => {

        const formdata = new FormData();

        formdata.set( 'ID' , houseNo );
        formdata.set( 'Name' , houseName);
        formdata.set( 'Mobile' , mobileNo );
        formdata.set( 'Addr' , addr );
        formdata.set( 'Postal' , postal );
        formdata.set( 'Phone' , phNo );
        formdata.set( 'phCode', phCode );
        formdata.append( 'image', houseimg );

        console.log( formdata.get('image') );
        
        return formdata;
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
    
    const getDataByName = ( selectedOption ) => {

        setSelectedOption( selectedOption );

        if(selectedOption !== null){
        axios.post('/house/getDataByName', { ID : selectedOption.ID } )
            .then( res => {

                if( res.data.img ===  null || res.data.img === undefined ) {
                 
                    setHouseNo( res.data.houseNo );
                    setHouseName( res.data.houseName );
                    setAddr( res.data.Address );
                    setMobileNo( res.data.MobileNo );
                    setPostal( res.data.PostalCode );
                    setPhCode( res.data.phCode );
                    setPhNo( res.data.PhoneNo ); 
                    setFindRecord('');
                }
                else {

                    var base64Flag = 'data:image/jpeg;base64,'; 
                    var imageStr = arrayBufferToBase64( res.data.img.data );

                    setHouseNo( res.data.ID );
                    setHouseName( res.data.Name );
                    setAddr( res.data.Address );
                    setMobileNo( res.data.MobileNo );
                    setPostal( res.data.PostalCode );
                    setPhCode( res.data.PhoneCode );
                    setPhNo( res.data.PhoneNo ); 
                    setFindRecord('');
                    setHouseImg( base64Flag + imageStr );

                    setFindRecord('');
                }
        });
        setFetched( true );    
        }    };

    const prevImage = (e) => {

        //if(edit) {

            setHouseImg( e.target.files[0] );
            setPrevImgVar( true );
            
            if( setPrevImgVar ) 
                setPrevImg(URL.createObjectURL(e.target.files[0])); 
        //}
    };

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

    return (
        
        <div id = "containerData">
            <div id = "upperline">
                <h3> Basic House Details </h3>
            </div>
            <div className = "formContainer" style = {{marginTop:'3.5rem'}}>
            <form >
            
                <fieldset id = "Id">
                    <legend> HNo. </legend>
                <input
                    id = "ID"
                    type = "number"
                    name = "ID"
                    value = {houseNo}
                    readOnly
                />
                </fieldset>
                <fieldset id = "name">
                <legend> House Name </legend>
                <input 
                    placeholder = "House Name"
                    type = "text" 
                    name = "Name" 
                    value = {houseName}
                    id = "Name" 
                    onChange = { e => { if(edit)setHouseName( e.target.value )} }
                />
                </fieldset>
                <fieldset id = "pic" style = {{width: '300px', height: '300px'}}>
                    <legend>House Photo</legend>
                    <input 
                        id = "img" 
                        type = "file" 
                        name = "picutre"
                        onChange = { prevImage }
                    />  
                    <img 
                        style = {{width:'300px',height:'300px'}}
                        alt = ""
                        id = "image"
                        src = { ( prevImgVar ) ? prevImg : houseimg }
                    />
                    <div id = "UploadDelte">
                        <u><label htmlFor = "img" style = {{marginLeft:'4.5rem'}}> Upload </label></u>
                        <u><label onClick = { () => { if(edit){setHouseImg('');setPrevImg('') }}}> Delete </label></u>
                    </div>  
                </fieldset>
                <fieldset id = "mob">
                <legend> Mobile No </legend>
                <input 
                    placeholder = "Mobile No"
                    type = "tel" 
                    name = "mobile" 
                    value = {mobileNo}
                    id = "mobileNo" 
                    onChange = { e => { if(edit)setMobileNo( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "address" style = {{width: '700px'}}>
                <legend> Address </legend>
                <input 
                    placeholder = "Address"
                    type = "text" 
                    name = "Addr" 
                    value = {addr}
                    id = "Addr" 
                    onChange = { e => { if(edit)setAddr( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "postal" style = {{width:'200px'}}>
                <legend> PIN Code </legend>
                <input 
                    placeholder = "Postal Code"
                    type = "number" 
                    name = "postalCode" 
                    value = {postal}
                    id = "postalcode" 
                    onChange = { e => { if(edit)setPostal( e.target.value )} }
                />
                </fieldset>
                <fieldset  id = "phcode" style = {{marginTop:'-1rem', width:'200px', marginRight:'1.5rem'}}>
                <legend> Phone Code </legend>
                <input 
                    placeholder = "Phone Code"
                    type = "number" 
                    name = "phoneCode" 
                    value = {phCode}
                    id = "phonecode" 
                    onChange = { e => { if(edit)setPhCode( e.target.value )} }
                />
                </fieldset> 
                <fieldset  id = "phnumber" style = {{width:'195px'}}>
                <legend> TelePhone No </legend>
                <input 
                    placeholder = "Telephone number"
                    type = "tel" 
                    name = "Phone" 
                    value = {phNo}
                    id = "Phone" 
                    onChange = { e => { if(edit)setPhNo( e.target.value )} }
                /> 
                </fieldset>
                <fieldset id = "ButtonBar" >
                <label id = "findlabel"> Find House: </label>
                <input
                    id = "find"
                    type = "number" 
                    name = "Find" 
                    value = { findRecord } 
                    onChange = { e => setFindRecord(e.target.value) }  
                /> 
                <button 
                    type = "button"
                    name = "Fetch"
                    onClick = { Fetch }
                > 
                    Find
                </button>
                <span>&nbsp;&nbsp;</span>
                <button 
                    type = "button"
                    name = "new"
                    onClick = { New }
                >
                    New
                </button>
                <span>&nbsp;&nbsp;</span>
                <button
                    type = "button"
                    name = "Insert"
                    onClick = { Insert }
                > 
                    Insert 
                </button>
                <span>&nbsp;&nbsp;</span>
                <button 
                    type = "button"
                    name = "Delete"
                    onClick = { Delete }
                > 
                    Delete 
                </button>
                <span>&nbsp;&nbsp;</span>
                <button 
                    type = "button"
                    name = "Update"
                    onClick = { Update }
                > 
                    Update 
                </button>
                <span>&nbsp;&nbsp;</span>
                </fieldset>
                <br/>
                    <Select 
                        id = "selectID"
                        isSearchable     
                        placeholder = ' Search Houses Details By Names '
                        value = { selectedOption }
                        onChange = { getDataByName }
                        options = { option }
                        maxMenuHeight = {140}
                        openMenuOnClick = { false }
                        styles = { stylesForFindByName }
                        isClearable
                    />           
            </form>
            </div>
        </div>
    )
}

export default Houses;
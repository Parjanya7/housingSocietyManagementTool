module.exports = ( req, res, next ) =>{

    const validator = require('validator');

    const data = req.body;
    const errors = {};

    data.UserName = (data.UserName) ? data.UserName : '';
    data.Name = (data.Name) ? data.Name : '';
    data.Email = (data.Email) ? data.Email : '';
    data.Password = (data.Password) ? data.Password : '';
    data.MobileNo = (data.MobileNo) ? data.MobileNo : '';
    

    if (!validator.isLength(data.UserName, { min: 1, max: 50 })) {
        errors.username = 'Username must be between 1 to 50 characters!';
    }

    if (data.UserName === '') {
        errors.username = 'Username field is required!';
    }

    if (!validator.isLength(data.Name, { min: 1, max: 50 })) {
        errors.name = 'Name must be between 1 to 50 characters!';
    }

    if (data.Name === '') {
        errors.name = 'Name field is required!';
    }

    if (!validator.isEmail(data.Email)) {
        errors.email = 'Email is invalid!';
    }

    if (data.Email === '') {
        errors.email = 'Email field is required!';
    }

    if (!validator.isLength(data.Password, { min: 1, max: 50 })) {
        errors.password = 'Password must be between 1 to 50 characters!';
    }

    if (data.Password === '') {
        errors.password = 'Password field is required!';
    }

    if (!validator.isMobilePhone(data.MobileNo)) {
        errors.mobile = 'Please specify a valid mobile number!';
    }

    if (data.MobileNo === '') {
        errors.mobile = 'Please specify a mobile number!';
    }

    if( req.body.HouseNo === '')
        errors.house = 'Please Enter House Number!'

    if ( Object.keys( errors ).length !== 0 ) {
        
        console.log('err');
        return res.json({errors, entryVar: false });
    }
    next();
};
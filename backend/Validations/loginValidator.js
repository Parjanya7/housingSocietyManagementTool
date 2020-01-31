module.exports = ( req, res, next ) => {

    const validator = require('validator');

    console.log( req.body );
    const data = req.body;
    const errors = {};

    data.Name = (data.Name) ? data.Name : '';
    data.Password = (data.Password) ? data.Password : '';

    if (data.Name === '' ) {
        errors.Name = 'Username is required!';
    }

    if (!validator.isLength(data.Password, { min: 1, max: 50 })) {
        errors.Password = 'Password must be between 6 to 30 characters!';
    }

    if (data.Password === '') {
        errors.Password = 'Password field is required!';
    }

    if ( Object.keys( errors ).length !== 0 ) {
        
        return res.json(errors);
    }
    next();
};
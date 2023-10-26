const httpStatusCodes = require('./statusCodes')
/*
* not found exception
* desc: use when entity not found
*/
class NotFound extends Error {

    constructor(message) {
        super(message);
        this.message = `${message} Not Found`;
        this.httpStatus = httpStatusCodes.NOT_FOUND;
        this.status = 0
        
    }
}

/*
* Unexpected Error exception
* desc: use in catch (internal server error) 
*/
class UnexpectedError extends Error {

    constructor(message) {
        super(message);
        this.message = `Unexpected Error happened ${message}`;
        this.httpStatus = httpStatusCodes.INTERNAL_SERVER;
        this.status = 0
    }
}

/*
* Bad Request exception
* desc: use when invalid case
*/
class BadRequest extends Error {

    constructor(message) {
        super(message);
        this.message = `${message}`;
        this.httpStatus = httpStatusCodes.BAD_REQUEST;
        this.status = 0
    }
}

/*
* Already Exist exception
* desc: use when entity already exist
*/
class AlreadyExist extends Error {

    constructor(message) {
        super(message);
        this.message = `${message} Already Exist`;
        this.httpStatus = httpStatusCodes.CONFLICT;
        this.status = 0
    }
}

/*
* Invalid Credentials exception
* desc: use when phone number or password invalid in login
*/
class InvalidCredentials extends Error {


    constructor(message) {
        super(message);
        this.message = `Invalid Credentials ${message} `;
        this.httpStatus = httpStatusCodes.UNAUTHORIZED;
        this.status = 0
    }
}

/*
* Not Acceptable exception
* desc: use when user not active or status of entity (active: false)
*/
class NotAcceptable extends Error {
    constructor(message) {
        super(message);
        this.message = `Not Acceptable ${message}`;
        this.httpStatus = httpStatusCodes.NOT_ACCEPTABLE;
        this.status = 0
    }
}

/*
* Unauthorized exception
* desc: use when user not authorized 
*/
class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.message = `Unauthorized ${message}`;
        this.httpStatus = httpStatusCodes.UNAUTHORIZED;
        this.status = 0
    }
}

/*
* Forbidden exception
* desc: use when user try to access endpoints without permission
*/
class Forbidden extends Error {
    constructor(message) {
        super(message);
        this.message = `Forbidden ${message}`;
        this.httpStatus = httpStatusCodes.FORBIDDEN;
        this.status = 0
    }
}

module.exports = {
    NotFound,
    UnexpectedError,
    BadRequest,
    InvalidCredentials,
    NotAcceptable,
    Unauthorized,
    Forbidden,
    AlreadyExist,
};
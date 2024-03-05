const {constants} = require("../constants.js")

const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500
    if(statusCode === constants.VALIDATION_ERROR){
        res.json({
            title: "Validation error",
            message: err.message,
            stackRace: err.stack
        })
    }
    else if(statusCode === constants.NOT_FOUND){
        res.json({
            title: "Not found",
            message: err.message,
            stackRace: err.stack
        })
    }
    else if(statusCode === constants.UNAUTHORIZED){
        res.json({
            title: "Un-authorized",
            message: err.message,
            stackRace: err.stack
        })
    }
    else if(statusCode === constants.FORBIDDEN){
        res.json({
            title: "Forbidden error",
            message: err.message,
            stackRace: err.stack
        })
    }
    else if(statusCode === constants.SERVER_ERROR){
        res.json({
            title: "Server error",
            message: err.message,
            stackRace: err.stack
        })
    }
    else{
        res.json({
            title: "No error",
            message: err.message,
            stackRace: err.stack
        })
    }
}

module.exports = errorHandler
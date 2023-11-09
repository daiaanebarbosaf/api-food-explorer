const AppError = require("../utils/AppError");

//['admin', 'customer'].includes('customer');

function verifyUserAuthorization(roleToVerify){
    return(request, response, next) => {
        const { role } = request.user;
        console.log(role);

        if(roleToVerify.includes(role)){
            throw new AppError("Unauthorized", 401)
        }

        return next();
    }
}

module.exports = verifyUserAuthorization;
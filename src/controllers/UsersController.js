const AppError = require("../utils/AppError");

const sqliteConnection = require('../database/sqlite');

class UsersController {
    create(request, response){
        const { name, email, password } = request.body;
    }
}

module.exports = UsersController;
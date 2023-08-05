const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require('../database/sqlite');

class UsersController {
    async create(request, response){
        const { name, email, password, is_admin } = request.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso.")
        }

        const hashedPassoword = await hash(password, 8);

        await database.run(
            "INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassoword, is_admin]
        
        );

        return response.status(201).json();
    }

    async update(request, response){
        const { name, email } = request.body;
        const { id } = request.body;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user){
            throw new AppError("Usuário não encontrado");
        }

        const userWithUpdateUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdateUpdateEmail && userWithUpdateUpdateEmail.id !== id){
            throw new AppError("Error e-mail já está em uso.");
        }
    }
}

module.exports = UsersController;
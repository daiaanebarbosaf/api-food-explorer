const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require('../database/knex');
const knex = require("../database/knex");
const { application } = require("express");

class UsersController {
    async create(request, response){
        const { name, email, password } = request.body;

 
        const checkUserExists = await knex("users").where({ email });

        if(checkUserExists.length > 0){
            throw new AppError("Este e-mail já está em uso.")
        }
        
        if(password.length >= 6){
            const hashedPassword = await hash(password, 8);

            await knex("users").insert({ name, email, password: hashedPassword });
        } else {
            throw new AppError("A senha deve ter no mínimo 6 caracteres.")
   
        }

        return response.status(201).json();
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if(!user){
            throw new AppError("Usuário não encontrado");
        }

        const userWithUpdateUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdateUpdateEmail && userWithUpdateUpdateEmail.id !== user.id){
            throw new AppError("Error e-mail já está em uso.");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        );

        return response.json();
    }
}

module.exports = UsersController;
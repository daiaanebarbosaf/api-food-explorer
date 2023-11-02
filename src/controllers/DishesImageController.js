const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesImageController {
    async update(request, response){

        const { dish_id } = request.body;
        const user_id = request.user.id;

        const diskStorage = new DiskStorage();
       

        const imgdishFilename = request.file.filename;
        //console.log(imgdishFilename + " Imagem Image Controller")


        const user = await knex("users").where({ id: user_id }).first();


        if(!user) {
            throw new AppError("Somente usuário com permissão de Administrador pode mudar a imagem", 401);
        }

        const dish = await knex("dishes")
        .where({ id: dish_id, user_id }).first();

        if(!dish){
            throw new AppError("Prato não existe", 404);
        }

        if(dish.imgdish){
            await diskStorage.deleteFile(dish.imgdish);
        }


        const filename = await diskStorage.saveFile(imgdishFilename);
        dish.imgdish = filename;

        await knex("dishes").update(dish).where({ id: dish_id });

        return response.json(dish);
    }
}

module.exports = DishesImageController;
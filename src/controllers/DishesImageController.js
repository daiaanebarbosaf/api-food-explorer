const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesImageController {
    async update(request, response){

        const diskStorage = new DiskStorage();
        const {dish_id} = request.user.id;

        const imgdishFilename = request.file.filename;

        const dish = await knex("dishes")
        .where({ id: dish_id }).first();

        if(!dish){
            throw new AppError("Somente usuário com permissão de Administrador pode mudar a imagem", 401);
        }

        if(dish.imgdish){
            await diskStorage.deleteFile(dish.imgdish);
        }

        await diskStorage.saveFile(imgdishFilename);
        dish.imgdish = filename;

        await knex("dishes").update(dish).where({ id: dish_id });

        return response.json(dish);
    }
}

module.exports = DishesImageController;
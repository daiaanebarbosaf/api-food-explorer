const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorange = require("../providers/DiskStorange");

class DishesImageController {
    async update(request, response){
        const dish_id = request.user.id;

        const imgdishFilename = request.file.filename;

        const diskStorange = new DiskStorange();

        const dish = await knex("dishes")
        .where({ id: dish_id }).first();

        if(!dish){
            throw new AppError("Somente usuário com permissão de Administrador pode mudar a imagem", 401);
        }

        if(dish.imgdish){
            await diskStorange.deleteFile(dish.imgdish);
        }

        const filename = await diskStorange.saveFile(imgdishFilename);
        dish.imgdish = filename;

        await knex("dishes").update(dish).where({ id: dish_id });

        return response.json(dish);
    }
}

module.exports = DishesImageController;
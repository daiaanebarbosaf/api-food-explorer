const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
    async create(request, response){
        const { title, description, categoty, price, tags } = request.body;

        const user_id = request.user.id;

        const [dishes_id] = await knex("dishes").insert({
            title,
            description,
            categoty,
            price,
            user_id,
            
        });

        const tagsInsert = tags.map(name => {
            return {
                dishes_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);
        
        return response.status(201).json(dishes_id);
    }

    async update(request, response){
        const { id } = request.params;
        const { title, description, categoty, price, tags } = request.body;

        const user_id = request.user.id;
        const { dish_id } = request.body;
        const imgdishFilename = request.file?.filename;
        console.log(imgdishFilename)
        
        const dishes_id = await knex("dishes").where({ id }).first();

        if (!dishes_id) {
            throw new AppError("Prato não encontrado.");
        }

        const dishUpdate = {
            title,
            description,
            categoty,
            price,
        };

        if (imgdishFilename) {
            const diskStorage = new DiskStorage();

            const dish = await knex("dishes")
                .where({ id: dish_id, user_id })
                .first();

        
                if(dish.imgdish){
                    await diskStorage.deleteFile(dish.imgdish);
                }
        

            const filename = await diskStorage.saveFile(imgdishFilename);
            dish.imgdish = filename;

            await knex("dishes").update(dish).where({ id: dish_id });
            return response.json(dish);
            
        } else {
            console.log("Não há imagem definida")
        }

        if(Object.keys(tags).length > 0){

            const tagsInsert = tags.map(name => {
                return {
                    dishes_id: id,
                    name,
                    user_id
                }

            });

            if (Object.keys(tagsInsert).length > 0  ) {
                await knex("tags").where('dishes_id', id).delete();
                await knex("tags").insert(tagsInsert);
            }
           
        } 



        
        await knex("dishes")
        .where({ id })
        .update(dishUpdate);

        return response.json();

    }

    async show(request, response){
        const { id } = request.params;

        const dishes = await knex("dishes").where({ id }).first();
        const tags = await knex("tags").where({ dishes_id: id }).orderBy("name");

        return response.json({
            ...dishes,
            tags
        });
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("dishes").where({ id }).delete();

        return response.json();
    }

    async index(request, response){
        const { title, tags } = request.query;

        const user_id = request.user.id;

        let dishes;
        
        if(title){
            const dishesByTitle = await knex('dishes')
            .whereLike('title', `%${title}%`)
            .orderBy('title');

            if(dishesByTitle.length == 0){
                const dishesByTags = await knex('tags')

                .select('dishes.*')
                .where('tags.name', 'like', `%${title}%`)
                .innerJoin('dishes', 'dishes.id', 'tags.dishes_id')
                .orderBy('dishes.title')
                .groupBy('dishes.id');

                dishes = dishesByTags;
            } else {
                dishes = dishesByTitle
            }

        } else {
            dishes = await knex("dishes")
                .whereLike("title", `%${title}%`)
                .orderBy("title");   
        }



        const userTags = await knex("tags").where({ user_id });
        const dishesWithTags = dishes.map(dishes => {
            const dishesTags = userTags.filter(tag => tag.dishes_id ===  dishes.id);

            return {
                ...dishes,
                tags: dishesTags
            }
        });

        return response.json(dishesWithTags);
    }
}

module.exports = DishesController;
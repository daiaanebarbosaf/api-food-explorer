const knex = require("../database/knex");

class DishesController {
    async create(request, response){
        const { title, description, categoty, price, tags } = request.body;
        const { user_id } = request.params;

        const [dishes_id] = await knex("dishes").insert({
            title,
            description,
            categoty,
            price,
            user_id 
        });

        const tagsInsert = tags.map(name => {
            return {
                dishes_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);
        
        response.json();
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
        const { title, user_id, tags } = request.query;

        let dishes;

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());
            dishes = await knex("tags")
                .select([
                    "dishes.id",
                    "dishes.title",
                    "dishes.user_id"
                ])
                .where("dishes.user_id", user_id)
                .whereLike("dishes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("dishes", "dishes.id", "tags.dishes_id")
                .orderBy("dishes.title");

            return response.json(dishes);

        } else {
            dishes = await knex("dishes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title");

            return response.json(dishes);
        }
    }
}

module.exports = DishesController;
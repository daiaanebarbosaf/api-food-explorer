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
}
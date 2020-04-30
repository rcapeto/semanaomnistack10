const axios = require('axios');
const Dev = require('../Models/dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');

/**
 * Geralmente temos 5 métodos no controller:
 * index: para mostrar todos 
 * show: para pegar apenas 1 dado (1 usuári por exemplo)
 * store: criar
 * update: alterar
 * destoy: deletar
 */

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response){ 
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login , avatar_url, bio } = apiResponse.data;
            //se o name não existir então vai pegar o login

            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            //mongo utiliza primeiro longitude e depois latitude
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }
        return response.json(dev);
    }
}

const Dev = require('../Models/dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
             //filtar por tecnologias
            techs: {
                $in: techsArray,
            },
         //buscar devs em um raio de 10km
            location: { 
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000 //10km em m
                },
            },
        });

        return response.json({ devs })

    }
}
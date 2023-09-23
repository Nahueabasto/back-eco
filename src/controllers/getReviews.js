const { User, Review } = require("../db");

const getReviews = async function(id){ //el get que me trae todas las reviews que ya estan posteadas
  
    const reviews = Review.findAll({
        where: {
            productId: id,	
        },
        include:{model: User},
        order:[['id','DESC']]
    })
    return reviews;
}

module.exports = {getReviews}
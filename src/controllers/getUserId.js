const axios = require("axios");
const { User } = require("../db");

const getUserId = async function (id) {
    if (id) {
        
        const user = await User.findOne({
            where: {
                id: id,
            },
            // include: 
            // [    { model: Review },
            //      { model: ShoppingCart },
            //      { model: Order }
            // ]
        })
        if (user) {
            return user
        } else {
            return "User is not registered in the database"
        }
    }else{
         const allUsers = await User.findAll()
    return allUsers;
    }
   
}

module.exports = { getUserId }
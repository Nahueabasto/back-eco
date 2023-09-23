const { Router } = require('express');
const { User } = require("../db");
//const { api } = require("./infoApis")
const router = Router(); 
const { createUser } = require('../controllers/CreateUser');
const { getUserId } = require('../controllers/getUserId');

router.get('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      console.log(req.params)
      let result = await getUserId(id)
      res.status(200).send(result)
  } catch (error) {
      res.status(400).send(error.message)
  }
})

//traer todos los usuarios
router.get('/', async (req, res) => {
  try {
      let result = await User.findAll();
      
      res.status(200).send(result)
  } catch (error) {
      res.status(400).send(error.message)
  }
})

router.post("/", async (req, res) => {
    try {
      const { email, name, fullname, profile, avatar } = req.body;
      let result = await createUser(
        email,
        name,
        fullname,
        profile,
        avatar,
      );
      // emailUser(email, fullname)
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  

  module.exports = router;
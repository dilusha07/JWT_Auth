const User = require("../models/User");

//controller actions
module.exports.signup = async (req, res) =>{
    const {userName, password} = req.body;
    try {
        const user = await User.create({ userName, password });
        res.status(201).json(user);
      }
      catch(err) {
        res.status(400).send('error, user creation failed!')
      }
}

module.exports.login = (req, res) =>{
    const {userName, password} = req.body;
    console.log(userName, password);
    res.send('user login');
}
const User = require("../models/User");

//handle errors
const handleErrors = (err) =>{
  console.log(err.message, err.code);
  let errors = {userName:'', password:''};

  //duplicate user name error
  if(err.code === 11000){
      errors.userName = 'that user name is already registered';
      return errors;
  }

//validation errors
if(err.message.includes('user validation is failed!')){
  Object.values(err.errors).forEach(({properties})=>{
    errors[properties.path] = properties,message;
  });
}
return errors;
}
//controller actions
module.exports.signup = async (req, res) =>{
    const {userName, password} = req.body;
    try {
        const user = await User.create({ userName, password });
        res.status(201).json(user);
      }
      catch(err) {
        res.status(400).json({errors});
      }
}

module.exports.login = (req, res) =>{
    const {userName, password} = req.body;
    console.log(userName, password);
    res.send('user login');
}
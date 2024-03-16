const User = require("../models/User");

//handle errors
const handleErrors = (err) =>{
  console.log(err.message, err.code);
  let errors = {userName:'', password:''};

  //incorrect user name
  if(err.message === "Incorrect user name"){
    errors.userName = 'That user name is not registered';
  }

   //incorrect password
   if(err.message === "Incorrect password"){
    errors.password = 'That password is not registered';
  }

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

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secrect-key', {
    expiresIn: maxAge
  });
};


//controller actions
module.exports.signup = async (req, res) =>{
    const {userName, password} = req.body;
    try {
        const user = await User.create({ userName, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
      }
      catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
      }
}

module.exports.login = async(req, res) =>{
    const {userName, password} = req.body;
  try {
    const user = await User.login(userName, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
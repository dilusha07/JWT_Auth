const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require("cookie-parser");
const {requireAuth, checkUser} = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(cookieParser);

const port = 3000;


//Connect MongoDB cloud database
const DB_URL = "mongodb+srv://Test1:Test1@cluster1.lshemxo.mongodb.net/TestAPP?retryWrites=true&w=majority";
  
  mongoose.connect(DB_URL)
  .then(()=>{
      console.log('DB connected!');
  })
  .catch((err)=>console.log("Db connected faild!", err));

// Start server
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });

//routes
app.use(authRoutes);
app.get('*', checkUser);

//cookies
app.get('/set-cookies', (req, res)=>{
  res.cookie('newUser', false);
  res.cookie('isUser', true, {maxTime: 1000*60*60*24, httpOnly:true});
  res.send('you got the cookies');
});

app.get('/read-cookie', (req, res)=>{
  console.log(cookies);
  res.json(cookies);
})


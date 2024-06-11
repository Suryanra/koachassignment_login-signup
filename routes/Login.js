const {model,connect}=require('../connect');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const login = async(req,resp) => {
// console.log("login page router ",req.body)
const {username,password:userpassword}=req.body;
const user = await model.findOne({ username: username });
// console.log("user",user)
if(!user)
{
resp.status(401).send({message:"user not found"});
return;
}
else {
      // console.log(user);
const {password:dbpassword}=user;
const {id}=user;
bcrypt.compare(userpassword,dbpassword, function(err, result) {
      // console.log("result : ",result);
      if(result){
            jwt.sign(
                  { id:id,
                    username,
                },
                  'shhhhh', 
                  { expiresIn: '24h' },
                  async function (err, token) {
                      if (err) {
                          resp.status(500).send({ error: 'Internal Server Error' });
                      } else {
                          await resp.cookie('test', token,{ httpOnly: true,
                            maxAge: 24 * 60 * 60 * 1000, });
                          resp.status(200).send({username:username,
                            id:id,
                          message:"login is successuful",
                          status:true});
                      }
                  }
              );
      }
      else{
            resp.status(401).send({message:"Password not matching"})
      }
  });
}
// console.log(user);
}

exports.login=login


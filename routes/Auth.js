var jwt = require('jsonwebtoken');

const Auth = (req,resp,next) => {
const token=req.cookies['test'];
// console.log("token",token);
if(token){
jwt.verify(token,
      'shhhhh', 
      async function (err, Authdata) {
          if (err) {
            // console.error('Error signing JWT:', err);
            req.user=null;
        } else {
            // console.log("data of a login banda ",Authdata);
            req.user=Authdata;
        }
})}
else {
  req.user=null;
}
      next();
}

exports.Auth=Auth;

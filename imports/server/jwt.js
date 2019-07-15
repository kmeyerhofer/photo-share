import jwt from 'jsonwebtoken';

const createJWT = (username, privatekey) => {
  return new Promise((resolve, reject) => {
    jwt.sign({sub: username, role: "admin"}, privatekey, { algorithm: 'RS256'}, (err, token) => {
      if(err){
        console.log(err);
        reject();
      }
      resolve(token);
    });
  });
}

export default createJWT;

import AdminDB from '../api/adminDB.js';
import validatePass from './validatePass.js';
import createJWT from './jwt.js'

const retrieveUserAndValidate = async (username, pass, privatekey, cb) => {
  try {
    const user = await AdminDB.findOne({username: username}, {fields: {password: 1}});
    const compare = await validatePass(pass, user.password);
    if(compare){
      const token = await createJWT(username, privatekey);
      return cb(null, token);
    } else {
      const err = new Error("passwords do not match");
      return cb(err.message, null);
    }
  } catch(err){
    console.log(err.message);
    }
}

export default retrieveUserAndValidate;

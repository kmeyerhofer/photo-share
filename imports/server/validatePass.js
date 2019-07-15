import bcrypt from 'bcryptjs';

const validatePass = async (plaintextPass, hash) => {
  try{
    const result = await bcrypt.compare(plaintextPass, hash);
    return result;
  }
  catch(err){
    console.log(err);
    return false;
  }
}

export default validatePass;

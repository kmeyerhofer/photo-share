import bcrypt from 'bcryptjs';

const passwordHashGen = async (plaintextPass, cb) => {
  const saltRounds = 10;
  try{
    const salt = await bcrypt.genSalt(saltRounds);
    const pwHash = await bcrypt.hash(plaintextPass, salt);
    cb(null, pwHash);
  }
  catch(err) {
    console.log(err);
    cb(err);
  }
}

export default passwordHashGen;

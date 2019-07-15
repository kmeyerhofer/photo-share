import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.resolve(process.cwd(), '../../../../../imports/server/private/jwtRS256.key').toString(), 'utf-8');
const publicKey = fs.readFileSync(path.resolve(process.cwd(), '../../../../../imports/server/private/jwtRS256.key.pub').toString(), 'utf-8');

const keys = {
  privatekey: privateKey,
  publickey: publicKey
};

export default keys;

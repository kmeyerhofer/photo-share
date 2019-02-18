import forge from 'node-forge';
import shortid from 'shortid';

export function generateFileHash(file) {
  const messageDigest = forge.md.sha256.create();
  const fileSHA256 = messageDigest.update(file);
  return fileSHA256.digest().toHex().toString();
}

export function randomBytes(bytes) {
  return forge.random.getBytesSync(bytes);
}

export function generateURL() {
  return shortid.generate();
}

export function encode64(string) {
  return forge.util.encode64(string);
}

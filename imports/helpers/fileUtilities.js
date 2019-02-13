import forge from 'node-forge';
import shortid from 'shortid';

export function generateFileHash(file) {
  const messageDigest = forge.md.sha256.create();
  const fileSHA256 = messageDigest.update(file);
  return fileSHA256.digest().toHex().toString();
}

export function random16Bytes() {
  return forge.random.getBytesSync(16);
}

export function generateURL() {
  return shortid.generate();
}

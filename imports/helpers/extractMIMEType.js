export default function extractMIMEType(base64String) {

  if(typeof base64String !== 'string'){
    return null;
  }
  
  const mime = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  const split = mime[1].split('/');
  const fileType = split[1];

  return fileType;
}

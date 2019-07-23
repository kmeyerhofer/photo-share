import MongoFiles from '../api/mongoFiles.js';

const isDirectoryEmpty = (fse, dirLocation) => {
  return new Promise((resolve, reject) => {
    fse.readdir(dirLocation, (err, files) => {
      if(err){
        reject(err);
      } else {
        var isEmpty = files.length > 1 ? false : true;
        resolve(isEmpty);
      }
    });
  });
}


const deleteFileAndFolder = async (fse, url, fileLocation, fileName) => {
  var path = `${process.env.PWD}/tmp/${fileLocation}`;
  var dirLoc = `${process.env.PWD}/tmp/${url}`;
  const isEmpty = await isDirectoryEmpty(fse, dirLoc).catch((err) => {
    console.log(err);
  });

  if(isEmpty) {
    try {
      const removeDir = await fse.remove(dirLoc);
      const removeDocument = await MongoFiles.remove({url: `${url}`});
      return true;
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const removeFile = await fse.remove(path);
      console.log(fileName);
      const removeDocument = await MongoFiles.remove({fileName:`${fileName}`});
      console.log(removeDocument);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}

export default deleteFileAndFolder;

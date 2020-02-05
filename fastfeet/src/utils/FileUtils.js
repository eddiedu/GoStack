import path from 'path';
import fs from 'fs';
import util from 'util';

class FileUtils {
  static async listFiles(folderPath) {
    const listFile = [];
    const directoryPath = path.join(`${__dirname}/${folderPath}`);
    // console.log(`directoryPath:${directoryPath}`);

    return new Promise(function(resolve, reject) {
      fs.readdir(directoryPath, function(err, files) {
        // handling error
        if (err) {
          // return console.log(`Unable to scan directory: ${err}`);
          reject(err);
        }
        // listing all files using forEach
        files.forEach(function(file) {
          // Do whatever you want to do with the file

          const [model] = file.split('.');
          // console.log(model);
          listFile.push(model);
        });
        resolve(listFile);
      });
    });
  }
}

export default FileUtils;

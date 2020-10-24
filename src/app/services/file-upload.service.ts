import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async sendFileUploadData(fileHash: string , fileName: string){
    console.log('sending file hash info');
    
    const url = "http://localhost:3000/api/fileUpload"
    const result = await axios.post(url , {
        hash: fileHash,
        name: fileName
    });
   
    return result.status;
   
  }

  async getAllFilesInfo(){
    const url = "http://localhost:3000/api/fileUpload/allFiles"
    const result = await axios.get(url);
    const fileInformation = [];
    if (result.status === 200) {
     // console.log(result.data);
      result.data.forEach(file => {
        const info = {
          name: file.name , 
          hashId: file.hashId, 
          urlHash: file.urlHash
        };
        fileInformation.push(info);
      });
      return fileInformation;
    } else { 
      return null;
    }
  }
}

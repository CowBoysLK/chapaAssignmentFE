import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as ipfsClient from 'ipfs-http-client';
import { Observable } from 'rxjs';
import {FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.scss']
})
export class FileShareComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

   fileInformation = [] ;
  constructor(private fileService: FileUploadService) { }
  
 
  fileBuffer: ArrayBuffer | string  = null;
  fileName: string = "";
  ipfs: any;

  ngOnInit(): void {
    this.ipfs = ipfsClient({host: 'ipfs.infura.io', port:5001, protocol: 'https'});
    const { globSource } = this.ipfs;

    const getfileObervable = new Observable(() => {
      setInterval( async  () =>{
        const data = await this.fileService.getAllFilesInfo();
        console.log(data);
          this.fileInformation = data;
      }, 5000);
    });

    getfileObervable.subscribe();
  }


  onClickFileInputButton(): void {
    console.log(this.fileInput);
    
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    const file: File = files[0];
    const  fileReader = new FileReader();
    this.fileName = file.name ;
    console.log(file);

   
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.fileBuffer = fileReader.result;
    }
    fileReader.readAsArrayBuffer(file);
    
    
  }

  async uploadFile(){
    console.log('upload file');
  
    const fileUp = await this.ipfs.add(this.fileBuffer);
    console.log('file added');
    console.log(fileUp.path);
    

    const fileHash = fileUp.path;

    this.fileService.sendFileUploadData(fileHash , this.fileName);
    
    
  }

  onGetFileUrlHsh(fileId : number){
    console.log('file id ' + fileId);
    
  }

}

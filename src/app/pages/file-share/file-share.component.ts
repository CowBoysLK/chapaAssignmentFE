import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as ipfsClient from 'ipfs-http-client';

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.scss']
})
export class FileShareComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  constructor() { }
  
 
  fileBuffer: ArrayBuffer | string  = null;
  fileName: string = "";
  ipfs: any;

  ngOnInit(): void {
    this.ipfs = ipfsClient({host: 'ipfs.infura.io', port:5001, protocol: 'https'});
    const { globSource } = this.ipfs;
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
    
    
  }

}

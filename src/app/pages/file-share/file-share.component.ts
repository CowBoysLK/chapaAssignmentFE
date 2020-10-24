import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as ipfsClient from 'ipfs-http-client';
import { from, Observable } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.scss'],
})
export class FileShareComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

  fileInformation = [];
  userName : string ;
  constructor(
    private fileService: FileUploadService,
    private _snackBar: MatSnackBar
  ) {}

  fileBuffer: ArrayBuffer | string = null;
  fileName: string = '';
  ipfs: any;

  ngOnInit(): void {
    this.ipfs = ipfsClient({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });
    const { globSource } = this.ipfs;
    this.userName = sessionStorage.getItem("userName");

    const data = this.fileService.getAllFilesInfo().then((result) => {
      if (result) {
        this.fileInformation = result;
      }
    });

    const getfileObervable = new Observable(() => {
      setInterval(async () => {
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
    const fileReader = new FileReader();
    this.fileName = file.name;
    console.log(file);

    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.fileBuffer = fileReader.result;
    };
    fileReader.readAsArrayBuffer(file);
  }

  async uploadFile() {
    console.log('upload file');
    

    const fileUp = await this.ipfs.add(this.fileBuffer);
    console.log('file added');
    this.showSuccessMsg();
    console.log(fileUp.path);

    const fileHash = fileUp.path;

    this.fileService.sendFileUploadData(fileHash, this.fileName);
  }

  onGetFileUrlHsh(fileId: number) {
    console.log('file id ' + fileId);
  }

  copyFilePath(urlHash: string) {}

  showSuccessMsg() {
    this._snackBar.open('File Upload Successful!', 'X', {
      duration: 3000,
    });
  }
}

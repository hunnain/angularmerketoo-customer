import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('scrollMe') scrollMe: ElementRef;
  scrolltop: number = 240;

  @Input() user: any = {}
  @Input() loading: boolean = false
  @Input() messages: Array<object> = [];
  @Input() onlineUsers: Array<any> = [];


  @Output() sendMsg = new EventEmitter<any>();

  public msg: string = "";
  public files: any[] = [];
  public enableAttachment: boolean = false;
  public isSending: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {
    console.log('💻', this.msg);
    if (this.msg.trim() || this.files.length) {
      let data = { msg: this.msg }
      if (this.files.length) {
        data['images'] = this.files.map(item => this.removeBase64(item.dataURL))
      }
      console.log(data)
      this.sendMsg.emit(data);
      // this.msg = "";
    }
  }

  removeBase64(data) {
    let base = data;
    let splited = base.split('base64,');
    let byteImg = splited[1];
    return byteImg;
  }

  resetState() {
    this.msg = "";
    this.enableAttachment = false;
    this.files = [];
  }

  get onScroll() {
    if (this.scrollMe && this.scrollMe.nativeElement) {
      let elem = this.scrollMe.nativeElement
      if (elem.scrollHeight !== this.scrolltop) {
        setTimeout(() => {
          this.scrolltop = elem.scrollHeight;
        }, 500)
      }
    }

    return this.scrolltop;
  }


  userStatus(userId) {
    if (this.onlineUsers.length && this.onlineUsers.includes(userId)) {
      return true;
    }
    return false;
  }

  showDropzone(isEnable) {
    this.enableAttachment = isEnable;
  }

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 4,
    acceptedFiles: 'image/*',
    maxFilesize: 10,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    autoProcessQueue: false,
    autoQueue: false,
    addRemoveLinks: true,
    createImageThumbnails: true
  };

  public onUploadInit(args: any): void {
    console.log('dropzone Init', args)
  }

  public onUploadError(args: any): void {
    console.log('💻', 'on dropzone error', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('💻', 'on dropzone success', args);
  }

  public fileAdded(file: File): void {
    console.log('💻', 'on dropzone file added', file);
    this.files.push(file);
  }
  public removeFile(file: any): void {
    console.log('💻', 'on dropzone remove', file);
    let index = this.files.findIndex(item => item.upload.uuid === file.upload.uuid);
    this.files.splice(index, 1);
  }

  downloadImage(img) {
    console.log(img);
    // const imgName = img.substr(img.lastIndexOf('/') + 1);
    // console.log(imgName);
    // const a = document.createElement('a');
    // a.href = img;
    // a.download = imgName;
    // document.body.appendChild(a);
    // a.click();
  }

  msgContainerStyle(msg) {
    if ((!msg.text && msg.images && msg.images.length) || (msg.text && msg.images && msg.images.length)) {
      return 'table-cell'
    } else if (msg.text && msg.text.length < 60) {
      return 'unset';
    } else {
      return 'inline-block';
    }
  }
}

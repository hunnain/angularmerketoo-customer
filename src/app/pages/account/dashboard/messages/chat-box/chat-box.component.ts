import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('scrollMe') scrollMe: ElementRef;
  scrolltop: number = null;

  @Input() user: any = {}
  @Input() loading: boolean = false
  @Input() messages: Array<object> = [];
  @Input() onlineUsers: Array<any> = [];


  @Output() sendMsg = new EventEmitter<any>();

  public msg: string = "";
  constructor() { }

  ngOnInit() {
  }

  sendMesssage() {
    if (this.msg.trim()) {
      this.sendMsg.emit(this.msg);
      this.msg = "";
    }
  }

  get onScroll() {
    if (this.scrollMe && this.scrollMe.nativeElement) {
      this.scrolltop = this.scrollMe.nativeElement.scrollHeight;
    }

    return this.scrolltop;
  }


  userStatus(userId) {
    if (this.onlineUsers.length && this.onlineUsers.includes(userId)) {
      return true;
    }
    return false;
  }
}

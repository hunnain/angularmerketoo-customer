import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  @Input() user: any = {}
  @Input() messages: Array<object> = []

  @Output() sendMsg = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}

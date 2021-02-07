import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss']
})
export class ListMessageComponent implements OnInit {

  public selectedUser: any= {};
  public openChatScreen: boolean = false;

  public dummyMessages = [
    {
      user_id:1,
      message:'hello there'
    },
    {
      user_id:2,
      message:'Hi, how are you?'
    },
    {
      user_id:1,
      message:"I'm, how are you?"
    },
    
  ]
  constructor() {
  }

  ngOnInit() { }

  openChat(user){
    this.openChatScreen = true;
    console.log("user",user)
    this.selectedUser = user;
  }

}

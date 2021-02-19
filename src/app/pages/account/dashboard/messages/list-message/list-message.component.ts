import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/shared/services/seller.service';
import { SignalrService } from 'src/app/shared/services/signalr.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss']
})
export class ListMessageComponent implements OnInit {

  public selectedUser: any = {};
  public allUsers: any[] = [];
  public messages: any[] = [];
  public openChatScreen: boolean = false;

  public dummyMessages = [
    {
      user_id: 1,
      message: 'hello there'
    },
    {
      user_id: 2,
      message: 'Hi, how are you?'
    },
    {
      user_id: 1,
      message: "I'm, how are you?"
    },

  ]

  public text: string = "";
  public receiver_id: string = "";
  public userId: string = "";
  constructor(
    public signalRService: SignalrService,
    private sellerService: SellerService
  ) { }

  ngOnInit() {
    this.getSellersList();
    this.createConnection()
  }

  createConnection() {
    this.signalRService.connect();
  }

  getSellersList() {
    return this.sellerService.getChatList().subscribe(res => {
      if (res && res['body'] && res['body'].senderList) {
        this.allUsers = res['body'].senderList;
      }
    })
  }

  openChat(user) {
    this.openChatScreen = true;
    this.selectedUser = user;
    this.getMessages(user['senderId'])
  }

  sendMessage(msg): void {
    let data = {
      text: msg,
      receiverId: this.selectedUser.senderId
    }
    // you can send the messge direclty to the hub or use the api controller.
    // choose wisely
    this.signalRService.sendMessageToApi(data).subscribe({
      next: _ => this.text = '',
      error: (err) => console.error(err)
    });

    // this.signalRService.sendMessageToHub(data).subscribe({
    //   next: _ => this.text = '',
    //   error: (err) => console.error(err)
    // });
  }


  getMessages(id) {
    this.signalRService.getChatMessage(id).subscribe();
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { chatMesage } from '../classes/chatMesage';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private base_url = environment.base_url;
  private signalr_base_url = environment.signlr_base_url;

  private hubConnection: HubConnection
  public messages: any[] = [];
  public onlineUsers: any[] = [];

  isConnected: EventEmitter<boolean> = new EventEmitter(false);
  weChatResponse: EventEmitter<any> = new EventEmitter(null);
  constructor(
    private cs: CommonService,
    private toastrService: ToastrService
  ) {
  }

  public connect = () => {
    let token = this.cs.getAccessToken()
    this.startConnection(token, 'ChatHub');
    this.addListeners();
  }

  public connectNotificationHub = () => {
    let token = this.cs.getAccessToken()
    this.startConnection(token, 'NotificationsHub');
    this.addNotificationListeners();
  }

  public sendMessageToApi(data: object) {
    return this.cs.post(`chat/send-msg`, data)
      .pipe(tap(res => {
        if (res) {
          console.log("message sucessfully sent to api controller")
          this.messages.push(res);
        }
      }
      ));
  }

  public sendMessageToHub(message: string) {
    var promise = this.hubConnection.invoke("BroadcastAsync", this.buildChatMessage(message))
      .then(() => { console.log('message sent successfully to hub'); })
      .catch((err) => console.log('error while sending a message to hub: ' + err));

    return from(promise);
  }

  public getChatMessage(id) {
    return this.cs.get(`chat/get-chat/${id}`)
      .pipe(map(res => {
        console.log("sucessfully get messages", res)
        if (res && res['body'] && res['body'].messages) {
          this.messages = res['body'].messages;
          return this.messages;
        }
      }));
  }

  private getConnection(token, hubName): HubConnection {
    return new HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${this.signalr_base_url}${hubName}`, {
        //skipNegotiation: true,
        //transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => token
      })
      .withHubProtocol(new MessagePackHubProtocol())
      //  .configureLogging(LogLevel.Trace)
      .build();
  }

  private buildChatMessage(message: string): chatMesage {
    return {
      text: message,
      receiverId: this.hubConnection.connectionId
    };
  }

  private startConnection(token, hubName) {
    this.hubConnection = this.getConnection(token, hubName);

    this.hubConnection.start()
      .then(() => {
        console.log('connection started')
        this.isConnected.next(true)
      })
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    // this.hubConnection.on("messageReceivedFromApi", (data: chatMesage) => {
    //   console.log("message received from API Controller")
    //   this.messages.push(data);
    // })
    // this.hubConnection.on("messageReceivedFromHub", (data: chatMesage) => {
    //   console.log("message received from Hub")
    //   this.messages.push(data);
    // })
    this.hubConnection.on("ConnectedUserList", res => {
      console.log("new user connected list", res);
      if (res) {
        this.onlineUsers = res;
        // console.log('💻', 'online users', this.onlineUsers);
      }
    })
    this.hubConnection.on("UserConnected", res => {
      console.log("new user connected", res);
      if (res) {
        if (!this.onlineUsers.includes(res)) {
          this.onlineUsers.push(res);
          // console.log('💻', 'online users', this.onlineUsers);
        }
      }
    })
    // this.hubConnection.on("ReceiveNotifications", (userId: string, message: string) => {
    //   console.log("ReceiveNotifications", userId, message);
    // })
    this.hubConnection.on("ReceiveMessage", (obj) => {
      console.log("ReceiveMessage from hub", obj);
      this.messages.push(obj);
    })
    this.hubConnection.on("UserDisconnected", (userId: string, message: string) => {
      console.log("UserDisconnected", userId, message);
      if (userId) {
        if (this.onlineUsers.includes(userId)) {
          let index = this.onlineUsers.indexOf(userId);
          this.onlineUsers.splice(index, 1);
          // console.log('💻', 'offline users', this.onlineUsers);
        }
      }
    })
  }

  private addNotificationListeners() {
    this.hubConnection.on("ReceiveNotifications", (res) => {
      console.log("ReceiveNotifications", res);
      if (res) {
        this.toastrService.success(res.Text, res.Type);
      }
    })
    this.hubConnection.on("WeChatPaymentStatus", (text, sourceId, status) => {
      console.log("WeChatPaymentStatus", text, sourceId, status);
      if (text && sourceId && status) {
        this.weChatResponse.emit({ text, sourceId, status });
      }
    })
  }
}




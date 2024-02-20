import { Component } from '@angular/core';
import { WebSocketAPI } from './config/websocket/web-socket-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'websocketTest';
  // conected = false;
  
  // greeting: any;
  // name?: string;

  // constructor(
  //   private webSocketAPI: WebSocketAPI
  // ){}

  // ngOnInit() {
  //   this.webSocketAPI = new WebSocketAPI();
  // }

  // connect(){
  //   console.log("connect websoket")
  //   this.webSocketAPI._connect("/topic/greetings");
  //   this.conected = true
  // }

  // disconnect(){
  //   this.webSocketAPI?._disconnect();
  //   this.conected = false;
  // }

  // sendMessage(){
  //   this.webSocketAPI._send("/app/greet" , this.name);
  // }

  // handleMessage(message:any){
  //   this.greeting = message;
  // }
}

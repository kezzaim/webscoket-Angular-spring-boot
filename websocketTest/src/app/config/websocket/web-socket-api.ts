import { Injectable } from "@angular/core";
import { Subject, endWith } from "rxjs";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Person } from '../../person/person/persone.model';
import { PersonComponent } from '../../person/person/person.component';

@Injectable({
    providedIn: 'root',
})
export class WebSocketAPI {

    stompClient: any;
    topic: string = "/topic/public";
    responceSubject = new Subject<any>;
    webSocketEndPoint: string = 'http://localhost:2023/ws-test';
    personComponent?: PersonComponent;


  _connect(endPoint: string) : any{
      console.log("-------- Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame: any) {
          _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {
              _this.onMessageReceived(sdkEvent);

            // _this.personComponent?.loadPersons();
          });
          //_this.stompClient.reconnect_delay = 2000;
      }, 
      this.errorCallBack(endPoint));
  };

  _disconnect(): void {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(endPoint: string, error?:any) :void{
      console.log("errorCallBack -> " , error)
      setTimeout(() => {
          this._connect(endPoint);
      }, 5000);
  }

/**
* Send message to sever via web socket
* @param {*} message 
*/
  _send(andPoint: string ,message:any):void {
      console.log("calling logout api via web socket");
      this.stompClient.send(andPoint, {}, JSON.stringify(message));
  }

  onMessageReceived(message:any): Subject<any>{
      console.log("Message Recieved from Server :: " , message);
      this.responceSubject.next(JSON.stringify(message.body));
      return this.responceSubject;
  }
  

 }
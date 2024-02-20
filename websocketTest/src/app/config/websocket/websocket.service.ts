import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: any;

  init(): any {
    console.log('connect to ws');
    const socket = new SockJS('http://localhost:2023/ws-test'); // Adjust URL if needed
    this.stompClient = Stomp.over(socket);

    // this.stompClient.connect({}, (frame : any) =>this.onConnected(frame), (error: any) =>this.onError(error));
    return this.stompClient;
  }
}

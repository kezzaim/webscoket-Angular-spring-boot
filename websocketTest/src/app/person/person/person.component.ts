import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/config/websocket/websocket.service';
import { PersonService } from './person.service';
import { Person } from './persone.model';

var sessionId = "";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit, AfterViewInit {
  private stompClient: any;
  count = 0;
  displayedColumns: string[] = ['id', 'name', 'age'];

  persons: Person[] = [];
  person?: Person;
  name = '';
  age = 0;
  id = -1;
  messages: string[] = [];


  constructor(
    private personService: PersonService,
    private wsService: WebsocketService
  ) {
    // connect to web socket server
    this.stompClient = this.wsService.init();
  }
  
  ngOnInit(): void {
    console.log('init page person');
    this.stompClient.connect(
      {},
      (frame: any) => this.onConnected(frame),
      (error: any) => this.onError(error)
    );
    this.loadPersons();
  }

  ngAfterViewInit(): void {
    console.log('after init');
    // Subscribe to messages from the server
  }

  loadPersons(): void {
    console.log('load persons');
    this.personService.getAllPersons().subscribe((persons) => {
      this.persons = persons;
    });

    // Send a message to the server
    // this.sendMessage('/app/persons/list', "msg");
  }

  addPersone(name: string, age: number): void {
    this.person = { name, age };
    console.log('save persone : ', JSON.stringify(this.person));
    if (this.person) {
      // this.personService.addPersone(this.person);
      this.sendMessage('/api/persons/save', this.person);
    } else {
      console.log('error person is null');
    }
  }

  deletePersone(id: number): void {
    console.log('save persone : ', id);
    if (id) {
      // this.personService.addPersone(this.person);
      this.sendMessage('/api/persons/delete', id);
    } else {
      console.log('error person is null');
    }
  }

  onConnected(frame: any): any {
    console.log('on connnect , frame : ', frame);
    console.log('----- stompClient : ', this.stompClient);
    let url = this.stompClient.ws._transport.url;

    url = url.replace(
      "ws://localhost:8080/spring-security-mvc-socket/secured/room/",  "");
    url = url.replace("/websocket", "");
    url = url.replace(/^[0-9]+\//, "");
    
    console.log("Your current session url: " + url);
    const subUrl= url.split('/');
    sessionId = subUrl[subUrl.length - 1];
    console.log("Your current session id is: " + sessionId);

    // Subscribe to the Public queue
    this.stompClient.subscribe('/queue/public', (message: any) =>
      this.onMessage(message)
    );

    // Subscribe to the Public 
    // this.stompClient.subscribe('/topic/public', (message: any) =>
    //   this.onMessage(message)
    // );

    // Subscribe to the specific user
    // this.stompClient.subscribe('/user/queue/reply-user'+sessionId, (message: any) =>
    //   this.onMessage(message)
    // );
  }

  onError(error: any) {
    console.log(
      'Could not connect to WebSocket server. Please refresh this page to try again!.  \n',
      error
    );
  }

  sendMessage(destination: string, message: any) {
    console.log('send messagggge : ', destination);
    this.stompClient.send(destination, {}, JSON.stringify(message));
  }

  onMessage(message: any): void {
    console.log('on messge, message :', message);
    this.messages.push(message.headers['message-id'] + ':' + message.body);
    console.log('on messge, ******  messages :', JSON.stringify(this.messages));
    this.loadPersons();
  }
}

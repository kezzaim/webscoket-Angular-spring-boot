import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WebSocketAPI } from '../../config/websocket/web-socket-api';
import { Person } from './persone.model';
import { WebSocketSubject } from 'rxjs/webSocket';
import { PersonService } from './person.service';
import { WebsocketService } from 'src/app/config/websocket/websocket.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit, AfterViewInit {

  private stompClient: any; 
  count =0;


  constructor(
    private personService: PersonService,
    private wsService: WebsocketService
  ) {
    // connect to web socket server
    this.stompClient = this.wsService.init();
  }

  persons: Person[] = [];
  person?: Person;
  name = '';
  age = 0;
  id=-1;
  username = "test"

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
    //this.wsService.sendMessage('/app/persons/list', {});
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
      this.sendMessage('/api/persons/delete',  id);
    } else {
      console.log('error person is null');
    }
  }

  onConnected(frame: any): any {
    console.log('on connnect , frame : ', frame);
    // Subscribe to the Public Topic
    this.stompClient.subscribe('/topic/public', (message: any) => this.onMessage(message));
    // this.stompClient.subscribe(`/user/${this.username}/topic/private`, (message: any) => this.onMessage(message));
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

  onMessage(message : any ): void {
    console.log('on messge, message :', message);
    this.loadPersons();
  }
}

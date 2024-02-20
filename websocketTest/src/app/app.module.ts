import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebSocketAPI } from './config/websocket/web-socket-api';
import { PersonComponent } from './person/person/person.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from './person/person/person.service';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from './config/websocket/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WebSocketAPI,PersonService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

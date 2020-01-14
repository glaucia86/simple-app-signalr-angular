import { Component, NgZone } from '@angular/core';
import { Message } from '../models/message';
import { ChatAppService } from '../services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.components.css']
})
export class AppComponent {
  title = 'ClientApp';
  txtMessage: '';
  clientID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();

  constructor(private chatAppService: ChatAppService, private _ngZone: NgZone) {
    this.subscribeToEvents();
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientid = this.clientID;
      this.message.type = 'sent';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatAppService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }

  private subscribeToEvents() {
    this.chatAppService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientid !== this.clientID) {
          message.type = 'received';
          this.messages.push(message);
        }
      });
    });
  }
}

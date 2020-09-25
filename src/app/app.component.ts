import { Component, OnInit } from '@angular/core';
import { ChatService } from './chatservice.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  response = '';
  text = '';
  usermsg = '';
  textcard = '';
  option1 = '';
  option2 = '';
  firstname = '';
  lastname = '';
  mobile = 0;
  email = '';
  id = 0;
  alternate = 0;
  rows = '';
  clicks = 0;


reply: Array<{ self: string, text: string, option1: string, option2: string}> = [];

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
this.chat.messages.subscribe(data => this.reply.push(data));
console.log(this.reply);
  }

  replyme(response) {
    if (response.length > 0) {
    const target = event.target;
    this.usermsg = response;
    const indata = {'self': 'user', 'text': this.usermsg, option1: '', option2: ''};
    this.reply.push(indata);
    this.chat.sendMsg(this.usermsg);
    this.response = '';
  }
}
 disable(msg) {
   if (this.clicks === 0) {
     this.replyme(msg);
     document.getElementById('sbutton').style.visibility = 'hidden' ;
     document.getElementById('nbutton').style.visibility = 'hidden' ;
     this.clicks = 1;
   }
 }
enable() {
this.clicks = 0;
this.reply.forEach(element => {
  element.option1 = null ;
  element.option2 = null ;
});

document.getElementById('sbutton').style.visibility = 'visible' ;
     document.getElementById('nbutton').style.visibility = 'visible' ;
}
opening(id) {
  document.getElementById(id).style.display = 'block';
}
closing(id) {
  document.getElementById(id).style.display = 'none';
}
}

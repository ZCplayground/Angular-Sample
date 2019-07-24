import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    public messageService: MessageService
    // Angular 将会在创建 MessagesComponent 的实例时 把 MessageService 的实例注入到这个属性中。
    ) 
  {}

  ngOnInit() {
  }

}

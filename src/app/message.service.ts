import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = []; // 缓存

  add(message: string) { // add() 方法往缓存中添加一条消息。
    this.messages.push(message); 
  }

  clear() { // clear() 方法用于清空缓存。
    this.messages = [];
  }
}